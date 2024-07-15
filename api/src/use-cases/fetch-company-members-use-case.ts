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
    const companyMember = await this.companyMembersRepository.findById(userId);

    if (!companyMember) {
      throw new ResourceNotFoundError("Company member not found");
    }

    const companyMembers =
      await this.companyMembersRepository.findManyByCompanyId(
        companyMember.companyId
      );

    return { companyMembers };
  }
}
