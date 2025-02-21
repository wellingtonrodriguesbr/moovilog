import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";

interface UpdateVehicleStatusUseCaseRequest {
	vehicleId: string;
	userId: string;
	companyId: string;
	status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RESERVED" | "BROKEN";
}

const ROLE_PERMISSIONS = ["ADMIN", "MANAGER"];

export class UpdateVehicleStatusUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private vehiclesRepository: VehiclesRepository
	) {}

	async execute({
		vehicleId,
		userId,
		companyId,
		status,
	}: UpdateVehicleStatusUseCaseRequest): Promise<void> {
		const [member, company] = await Promise.all([
			await this.companyMembersRepository.findMemberInCompany(
				userId,
				companyId
			),
			await this.companiesRepository.findById(companyId),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!ROLE_PERMISSIONS.includes(member.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const vehicle = await this.vehiclesRepository.findVehicleInCompany(
			vehicleId,
			companyId
		);

		if (!vehicle) {
			throw new ResourceNotFoundError("Vehicle not found");
		}

		await this.vehiclesRepository.updateStatus(vehicle.id, status);
	}
}
