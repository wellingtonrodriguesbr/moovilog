import { IDriver } from "@/interfaces/driver";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchDriversByCompanyUseCaseRequest {
	companyId: string;
	userId: string;
}

interface FetchDriversByCompanyUseCaseResponse {
	drivers: IDriver[];
}

export class FetchDriversByCompanyUseCase {
	constructor(
		private driversRepository: DriversRepository,
		private companyRepository: CompaniesRepository,
		private companyMemberRepository: CompanyMembersRepository
	) {}
	async execute({
		companyId,
		userId,
	}: FetchDriversByCompanyUseCaseRequest): Promise<FetchDriversByCompanyUseCaseResponse> {
		const company = await this.companyRepository.findById(companyId);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		const memberInCompany =
			await this.companyMemberRepository.findMemberInCompany(userId, companyId);

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		const drivers = await this.driversRepository.findManyByCompanyId(companyId);

		return { drivers };
	}
}
