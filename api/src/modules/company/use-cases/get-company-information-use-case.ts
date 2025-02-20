import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ICompany } from "@/modules/company/interfaces/company";

interface GetCompanyInformationUseCaseRequest {
	userId: string;
}

interface GetCompanyInformationUseCaseResponse {
	company: ICompany;
}

export class GetCompanyInformationUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		userId,
	}: GetCompanyInformationUseCaseRequest): Promise<GetCompanyInformationUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const company = await this.companiesRepository.findById(member.companyId);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		return { company };
	}
}
