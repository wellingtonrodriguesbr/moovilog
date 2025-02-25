import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { PermissionService } from "@/services/permission-service";

interface UpdateDriverStatusUseCaseRequest {
	driverId: string;
	userId: string;
	status: "ACTIVE" | "INACTIVE";
}

export class UpdateDriverStatusUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private driversRepository: DriversRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		driverId,
		userId,
		status,
	}: UpdateDriverStatusUseCaseRequest): Promise<void> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const hasPermission = await this.permissionService.hasPermission(
			member.id,
			["SUPER_ADMIN", "ADMIN", "MANAGE_VEHICLES_AND_DRIVERS"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const driver = await this.driversRepository.findById(driverId);

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		const driverInCompany = await this.driversRepository.findDriverInCompany(
			driver.documentNumber,
			member.companyId
		);

		if (!driverInCompany) {
			throw new ResourceNotFoundError("Driver not found in company");
		}

		await this.driversRepository.updateStatus(driver.id, status);
	}
}
