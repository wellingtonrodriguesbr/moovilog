import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ICompanyMemberRoles } from "@/interfaces/company-member";
import { NotAllowedError } from "./errors/not-allowed-error";

interface RegisterCompanyMemberUseCaseRequest {
  memberId: string;
  creatorId: string;
  role: ICompanyMemberRoles;
}

interface RegisterCompanyMemberUseCaseResponse {
  companyMemberId: string;
}

export class RegisterCompanyMemberUseCase {
  constructor(private companyMembersRepository: CompanyMembersRepository) {}

  async execute({
    memberId,
    creatorId,
    role,
  }: RegisterCompanyMemberUseCaseRequest): Promise<RegisterCompanyMemberUseCaseResponse> {
    const creator = await this.companyMembersRepository.findById(creatorId);

    if (!creator) {
      throw new ResourceNotFoundError("User not found");
    }

    if (creator.role !== "ADMIN") {
      throw new NotAllowedError(
        "You do not have permission to perform this action, please ask your administrator for access"
      );
    }

    const memberAlreadyExists =
      await this.companyMembersRepository.findMemberInCompany(
        memberId,
        creator.companyId
      );

    if (memberAlreadyExists) {
      throw new CompanyMemberAlreadyExistsError();
    }

    const companyMember = await this.companyMembersRepository.create({
      companyId: creator.companyId,
      memberId,
      role,
    });

    return { companyMemberId: companyMember.id };
  }
}
