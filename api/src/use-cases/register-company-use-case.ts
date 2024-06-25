import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterCompanyUseCaseRequest {
  userId: string;
  name: string;
  documentNumber: string;
  type: "HEADQUARTERS" | "BRANCH" | "AGENCY";
  size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
}

interface Company {
  id: string;
  name: string;
  documentNumber: string;
  type: "HEADQUARTERS" | "BRANCH" | "AGENCY";
  size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

interface RegisterCompanyUseCaseResponse {
  company: Company;
}

export class RegisterCompanyUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    name,
    documentNumber,
    type,
    size,
  }: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }

    const companyAlreadyRegisteredWithThisDocument =
      await this.companiesRepository.findByDocumentNumber(documentNumber);

    if (companyAlreadyRegisteredWithThisDocument) {
      throw new CompanyAlreadyExistsError();
    }

    const company = await this.companiesRepository.create({
      ownerId: user.id,
      name,
      documentNumber,
      size,
      type,
    });

    return { company };
  }
}
