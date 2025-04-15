import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { PermissionService } from "@/services/permission-service";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { IPickup } from "@/modules/pickup/interfaces/pickup";

interface FetchPickupsFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchPickupsFromCompanyUseCaseResponse {
	pickups: IPickup[];
}

export class FetchPickupsFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private pickupsRepository: PickupsRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		userId,
		companyId,
	}: FetchPickupsFromCompanyUseCaseRequest): Promise<FetchPickupsFromCompanyUseCaseResponse> {
		const [company, memberInCompany] = await Promise.all([
			this.companiesRepository.findById(companyId),
			this.companyMembersRepository.findMemberInCompany(userId, companyId),
		]);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		const hasPermission = await this.permissionService.hasPermission(
			memberInCompany.id,
			["SUPER_ADMIN", "ADMIN", "VIEW_SHIPMENTS_AND_PICKUPS"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const pickups = await this.pickupsRepository.findManyByCompanyId(companyId);

		return { pickups };
	}
}
