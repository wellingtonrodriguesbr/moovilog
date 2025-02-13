import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { FinanceTransaction } from "@/interfaces/finance-transaction";

interface TransactionResponse {
	transactions: FinanceTransaction[];
}

export function useFetchTransactionsFromCompany() {
	const { company } = useCompanyStore();
	const {
		data: transactionsFromCompany,
		isPending: isFetchTransactionsFromCompanyPending,
	} = useQuery({
		queryKey: ["transactions"],
		queryFn: handleFetchTransactionsFromCompany,
		enabled: !!company,
	});

	async function handleFetchTransactionsFromCompany() {
		const { data } = await api.get<TransactionResponse>(
			`/companies/${company.id}/transactions`
		);

		return data.transactions;
	}

	return {
		transactionsFromCompany: transactionsFromCompany ?? [],
		isFetchTransactionsFromCompanyPending,
	};
}
