import { FetchCategoriesUseCase } from "@/modules/financial/use-cases/fetch-categories-use-case";
import { PrismaFinanceCategoriesRepository } from "@/modules/financial/repositories/prisma/prisma-finance-categories-repository";

export function makeFetchCategoriesUseCase() {
  const financeCategoriesRepository = new PrismaFinanceCategoriesRepository();

  const fetchCategoriesUseCase = new FetchCategoriesUseCase(financeCategoriesRepository);

  return fetchCategoriesUseCase;
}
