import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { FreightsRepository } from "@/repositories/freights-repository";
import { IFreight } from "@/interfaces/freight";

interface FetchFreightsFromCompanyUseCaseRequest {
  userId: string;
}

interface FetchFreightsFromCompanyUseCaseResponse {
  freights: IFreight[];
}

export class FetchFreightsFromCompanyUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private freightsRepository: FreightsRepository
  ) {}

  async execute({
    userId,
  }: FetchFreightsFromCompanyUseCaseRequest): Promise<FetchFreightsFromCompanyUseCaseResponse> {
    const member = await this.companyMembersRepository.findById(userId);

    if (!member) {
      throw new ResourceNotFoundError();
    }

    const freights = await this.freightsRepository.findManyByCompanyId(
      member.companyId
    );

    return { freights };
  }
}
