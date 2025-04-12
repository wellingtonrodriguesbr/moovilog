import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IDriver } from "@/modules/driver/interfaces/driver";

interface FetchDriversFromCompanyUseCaseRequest {
	companyId: string;
	userId: string;
}

interface FetchDriversFromCompanyUseCaseResponse {
	drivers: IDriver[];
}

export class FetchDriversFromCompanyUseCase {
	constructor(
		private driversRepository: DriversRepository,
		private companiesRepository: CompaniesRepository,
		private companyMembersRepository: CompanyMembersRepository
	) {}
	async execute({
		companyId,
		userId,
	}: FetchDriversFromCompanyUseCaseRequest): Promise<FetchDriversFromCompanyUseCaseResponse> {
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

		const drivers = await this.driversRepository.findManyByCompanyId(companyId);

		return { drivers };
	}
}
