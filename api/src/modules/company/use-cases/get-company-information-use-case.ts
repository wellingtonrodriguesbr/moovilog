import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ICompany } from "@/modules/company/interfaces/company";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

interface GetCompanyInformationUseCaseRequest {
	userId: string;
	companyId: string;
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
		companyId,
	}: GetCompanyInformationUseCaseRequest): Promise<GetCompanyInformationUseCaseResponse> {
		const company = await this.companiesRepository.findById(companyId);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		const memberInCompany =
			await this.companyMembersRepository.findMemberInCompany(
				userId,
				companyId
			);

		if (!memberInCompany) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		return { company };
	}
}
