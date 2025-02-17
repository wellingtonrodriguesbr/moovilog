import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IPickup } from "../interfaces/pickup";

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
		private pickupsRepository: PickupsRepository
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

		const pickups = await this.pickupsRepository.findManyByCompanyId(companyId);

		return { pickups };
	}
}
