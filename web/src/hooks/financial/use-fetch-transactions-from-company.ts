import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { FinanceTransaction } from "@/interfaces/finance-transaction";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface TransactionResponse {
	transactions: FinanceTransaction[];
	totalTransactions: number;
	totalIncomeInCents: number;
	totalExpenseInCents: number;
	totalBalanceInCents: number;
	percentage: number;
}

export function useFetchTransactionsFromCompany() {
	const router = useRouter();
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
		try {
			const { data } = await api.get<TransactionResponse>(
				`/companies/${company.id}/transactions`
			);

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 403) {
					toast.error(
						"Você não tem permissão para acessar essa página"
					);
					router.push("/inicio");
				}

				throw error;
			}
		}
	}

	return {
		transactionsFromCompany: transactionsFromCompany?.transactions ?? [],
		totalTransactions: transactionsFromCompany?.totalTransactions ?? 0,
		totalIncomeInCents: transactionsFromCompany?.totalIncomeInCents ?? 0,
		totalExpenseInCents: transactionsFromCompany?.totalExpenseInCents ?? 0,
		totalBalanceInCents: transactionsFromCompany?.totalBalanceInCents ?? 0,
		percentage: transactionsFromCompany?.percentage ?? 0,
		isFetchTransactionsFromCompanyPending,
	};
}
