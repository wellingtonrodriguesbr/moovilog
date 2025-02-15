import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface SummaryResponse {
	totalTransactions: number;
	totalIncomeInCents: number;
	totalExpenseInCents: number;
	summary: number;
	percentage: number;
}

export function useGetFinancialSummaryFromCompany() {
	const { company } = useCompanyStore();
	const { data, isPending: isGetFinancialSummaryFromCompanyPending } =
		useQuery({
			queryKey: ["financial-summary"],
			queryFn: handleGetFinancialSummaryFromCompany,
			enabled: !!company,
		});

	async function handleGetFinancialSummaryFromCompany() {
		const { data } = await api.get<SummaryResponse>(
			`/companies/${company.id}/transactions/summary`
		);

		return data;
	}

	return {
		data,
		isGetFinancialSummaryFromCompanyPending,
	};
}
