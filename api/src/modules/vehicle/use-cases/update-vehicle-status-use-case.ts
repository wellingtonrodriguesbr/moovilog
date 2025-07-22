import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { PermissionService } from "@/services/permission-service";

interface UpdateVehicleStatusUseCaseRequest {
  vehicleId: string;
  userId: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RESERVED" | "BROKEN";
}

export class UpdateVehicleStatusUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private vehiclesRepository: VehiclesRepository,
    private permissionService: PermissionService
  ) {}

  async execute({ vehicleId, userId, status }: UpdateVehicleStatusUseCaseRequest): Promise<void> {
    const member = await await this.companyMembersRepository.findByUserId(userId);

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

    const vehicle = await this.vehiclesRepository.findVehicleInCompany(vehicleId, member.companyId);

    if (!vehicle) {
      throw new ResourceNotFoundError("Vehicle not found");
    }

    await this.vehiclesRepository.updateStatus(vehicle.id, status);
  }
}
