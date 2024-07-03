import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { ICompanyMember } from "@/interfaces/company-member";

interface FetchCompanyMembersUseCaseRequest {
  userId: string;
}

interface FetchCompanyMembersUseCaseResponse {
  companyMembers: ICompanyMember[];
}

export class FetchCompanyMembersUseCase {
  constructor(private companyMembersRepository: CompanyMembersRepository) {}

  async execute({
    userId,
  }: FetchCompanyMembersUseCaseRequest): Promise<FetchCompanyMembersUseCaseResponse> {
    const companyId =
      await this.companyMembersRepository.findCompanyIdByMemberId(userId);

    if (!companyId) {
      throw new ResourceNotFoundError("Company id not found");
    }

    const companyMembers =
      await this.companyMembersRepository.findManyByCompanyId(companyId);

    return { companyMembers };
  }
}
