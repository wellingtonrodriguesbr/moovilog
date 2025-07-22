import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { FinanceCategory } from "@/interfaces/finance-category";

interface TransactionResponse {
  categories: FinanceCategory[];
}

export function useFetchCategories() {
  const { data: categories, isPending: isFetchCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: handleFetchCategories,
  });

  async function handleFetchCategories() {
    const { data } = await api.get<TransactionResponse>("/transactions/categories");

    return data.categories;
  }

  return {
    categories: categories ?? [],
    isFetchCategoriesPending,
  };
}
