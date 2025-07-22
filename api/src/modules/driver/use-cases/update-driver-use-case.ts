import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { IDriverType } from "@/modules/driver/interfaces/driver";
import { DriverAlreadyExistsError } from "@/modules/driver/use-cases/errors/driver-already-exists-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { PermissionService } from "@/services/permission-service";

interface UpdateDriverUseCaseRequest {
  name?: string;
  documentNumber?: string;
  phone?: string;
  type?: IDriverType;
  userId: string;
  driverId: string;
}

type UpdateDriverUseCaseResponse = void;

export class UpdateDriverUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private driversRepository: DriversRepository,
    private permissionService: PermissionService
  ) {}

  async execute({
    name,
    documentNumber,
    phone,
    type,
    userId,
    driverId,
  }: UpdateDriverUseCaseRequest): Promise<UpdateDriverUseCaseResponse> {
    const member = await this.companyMembersRepository.findByUserId(userId);

    if (!member) {
      throw new ResourceNotFoundError("Member not found");
    }

    const hasPermission = await this.permissionService.hasPermission(member.id, [
      "SUPER_ADMIN",
      "ADMIN",
      "MANAGE_VEHICLES_AND_DRIVERS",
    ]);

    if (!hasPermission) {
      throw new NotAllowedError("You do not have permission to perform this action");
    }

    const driver = await this.driversRepository.findById(driverId);

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
    }

    if (
      documentNumber &&
      driver.documentNumber !== documentNumber &&
      (await this.driversRepository.findDriverInCompany(documentNumber, member.companyId))
    ) {
      throw new DriverAlreadyExistsError("Driver already exists with same document number");
    }

    if (
      phone &&
      driver.phone !== phone &&
      (await this.driversRepository.findByPhoneNumberInCompany(phone, member.companyId))
    ) {
      throw new DriverAlreadyExistsError("Driver already exists with same phone number");
    }

    await this.driversRepository.update(driverId, {
      name: name ?? driver.name,
      documentNumber: documentNumber ?? driver.documentNumber,
      phone: phone ?? driver.phone,
      type: type ?? driver.type,
    });
  }
}
