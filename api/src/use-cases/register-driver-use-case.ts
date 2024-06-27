import { hash } from "bcryptjs";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

interface RegisterDriverUseCaseRequest {
  name: string;
  password: string;
  documentNumber: string;
  phone: string;
  backupPhone?: string | null;
  creatorId: string;
}

interface Driver {
  id: string;
  name: string;
  password: string;
  documentNumber: string;
  phone: string;
  backupPhone: string | null;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  creatorId: string;
}

interface RegisterDriverUseCaseResponse {
  driver: Driver;
}

export class RegisterDriverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private companyMembersRepository: CompanyMembersRepository,
    private driversRepository: DriversRepository
  ) {}

  async execute({
    name,
    password,
    documentNumber,
    phone,
    backupPhone,
    creatorId,
  }: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
    const [user, driverAlreadyExists, companyId] = await Promise.all([
      await this.usersRepository.findById(creatorId),
      await this.driversRepository.findByDocumentNumber(documentNumber),
      await this.companyMembersRepository.findCompanyIdByMemberId(creatorId),
    ]);

    if (user?.role !== "ADMIN" && user?.role !== "OPERATIONAL") {
      throw new UnauthorizedError(
        "You do not have permission to perform this action, please ask your administrator for access"
      );
    }

    if (driverAlreadyExists) {
      throw new DriverAlreadyExistsError();
    }

    if (!companyId) {
      throw new ResourceNotFoundError("Company id not found");
    }

    const passwordHash = await hash(password, 6);

    const driver = await this.driversRepository.create({
      name,
      password: passwordHash,
      documentNumber,
      phone,
      backupPhone,
      companyId,
      creatorId: user.id,
    });

    return {
      driver,
    };
  }
}
