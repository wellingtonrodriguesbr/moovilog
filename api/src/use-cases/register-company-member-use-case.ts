import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { IUserRoles } from "@/interfaces/user";

interface RegisterCompanyMemberUseCaseRequest {
  userId: string;
  creatorId: string;
  role: IUserRoles;
}

interface RegisterCompanyMemberUseCaseResponse {
  companyMemberId: string;
}

export class RegisterCompanyMemberUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private companyMembersRepository: CompanyMembersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    creatorId,
    role,
  }: RegisterCompanyMemberUseCaseRequest): Promise<RegisterCompanyMemberUseCaseResponse> {
    const [member, company] = await Promise.all([
      this.usersRepository.findById(userId),
      this.companiesRepository.findByOwnerId(creatorId),
    ]);

    if (!member) {
      throw new ResourceNotFoundError("User not found");
    }

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    const memberAlreadyExists =
      await this.companyMembersRepository.findMemberByCompanyId(
        member.id,
        company.id
      );

    if (memberAlreadyExists) {
      throw new CompanyMemberAlreadyExistsError();
    }

    const companyMember = await this.companyMembersRepository.create({
      companyId: company.id,
      memberId: member.id,
      role,
    });

    return { companyMemberId: companyMember.id };
  }
}
