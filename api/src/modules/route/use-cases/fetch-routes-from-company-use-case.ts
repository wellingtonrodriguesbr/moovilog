import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IRoute } from "@/modules/route/interfaces/route";

interface FetchRoutesFromCompanyUseCaseRequest {
	userId: string;
	companyId: string;
}

interface FetchRoutesFromCompanyUseCaseResponse {
	routes: IRoute[];
}

export class FetchRoutesFromCompanyUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private routesRepository: RoutesRepository
	) {}

	async execute({
		userId,
		companyId,
	}: FetchRoutesFromCompanyUseCaseRequest): Promise<FetchRoutesFromCompanyUseCaseResponse> {
		const [company, memberInCompany] = await Promise.all([
			this.companiesRepository.findById(companyId),
			this.companyMembersRepository.findMemberInCompany(userId, companyId),
		]);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found");
		}

		const routes = await this.routesRepository.findManyByCompanyId(companyId);

		return { routes };
	}
}
