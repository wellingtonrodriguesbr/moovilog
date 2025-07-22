import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { ICompanyMember } from "@/modules/company-member/interfaces/company-member";

interface FetchMembersFromCompanyUseCaseRequest {
  userId: string;
  companyId: string;
}

interface FetchMembersFromCompanyUseCaseResponse {
  companyMembers: ICompanyMember[];
}

export class FetchMembersFromCompanyUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({
    userId,
    companyId,
  }: FetchMembersFromCompanyUseCaseRequest): Promise<FetchMembersFromCompanyUseCaseResponse> {
    const [company, memberInCompany] = await Promise.all([
      this.companiesRepository.findById(companyId),
      this.companyMembersRepository.findMemberInCompany(userId, companyId),
    ]);

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    if (!memberInCompany) {
      throw new ResourceNotFoundError("Company member not found in company");
    }

    const companyMembers = await this.companyMembersRepository.findManyByCompanyId(memberInCompany.companyId);

    return { companyMembers };
  }
}
