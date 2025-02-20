import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";

interface DeleteDriverUseCaseRequest {
	driverId: string;
	userId: string;
	companyId: string;
}

const ROLE_PERMISSIONS = ["ADMIN", "MANAGER"];

export class DeleteDriverUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private driversRepository: DriversRepository
	) {}

	async execute({
		driverId,
		userId,
		companyId,
	}: DeleteDriverUseCaseRequest): Promise<void> {
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

		const driver = await this.driversRepository.findById(driverId);

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		const driverInCompany = await this.driversRepository.findDriverInCompany(
			driver.documentNumber,
			companyId
		);

		if (!driverInCompany) {
			throw new ResourceNotFoundError("Driver not found in company");
		}

		await this.driversRepository.deleteById(driver.id);
	}
}
