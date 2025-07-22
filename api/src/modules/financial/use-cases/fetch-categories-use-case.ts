import { IFinanceCategory } from "@/modules/financial/interfaces/finance-category";
import { FinanceCategoriesRepository } from "@/modules/financial/repositories/finance-categories-repository";

interface FetchCategoriesUseCaseResponse {
  categories: IFinanceCategory[];
}

export class FetchCategoriesUseCase {
  constructor(private financeCategoriesRepository: FinanceCategoriesRepository) {}
  async execute(): Promise<FetchCategoriesUseCaseResponse> {
    const categories = await this.financeCategoriesRepository.findMany();

    return { categories };
  }
}
