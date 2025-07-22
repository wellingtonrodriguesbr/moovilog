import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { ICompany } from "@/modules/company/interfaces/company";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { IUserExtraData } from "@/modules/user/interfaces/user";

interface GetCompanyInformationUseCaseRequest {
  userId: string;
}

interface GetCompanyInformationUseCaseResponse {
  company: ICompany;
}

export class GetCompanyInformationUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private companyMembersRepository: CompanyMembersRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({ userId }: GetCompanyInformationUseCaseRequest): Promise<GetCompanyInformationUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if ((user.extraData as IUserExtraData).onboardingStep === "register_company") {
      throw new BadRequestError("Complete the company registration first");
    }

    const member = await this.companyMembersRepository.findByUserId(user.id);

    if (!member) {
      throw new ResourceNotFoundError("Member not found");
    }

    const company = await this.companiesRepository.findById(member.companyId);

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    if (
      (user.extraData as IUserExtraData).onboardingStep === "register_company_address" &&
      company.addressId === null
    ) {
      throw new BadRequestError("Complete the company address registration first");
    }

    return { company };
  }
}
