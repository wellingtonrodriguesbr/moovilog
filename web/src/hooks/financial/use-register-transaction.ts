import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FinanceTransaction } from "@/interfaces/finance-transaction";
import { useCompanyStore } from "@/stores/company-store";

interface RegisterTransactionData {
	amountInCents: number;
	type: "INCOME" | "EXPENSE";
	status: "PENDING" | "PAID" | "OVERDUE";
	dueDate: Date;
	paymentMethod:
		| "PIX"
		| "CREDIT_CARD"
		| "DEBIT_CARD"
		| "CASH"
		| "BANK_TRANSFER"
		| "OTHER";
	categoryName: string;
	driverId?: string | null;
}

interface RegisterTransactionResponse {
	transaction: FinanceTransaction;
}

export function useRegisterTransaction() {
	const { company } = useCompanyStore();
	const queryClient = useQueryClient();
	const {
		mutateAsync: registerTransaction,
		isPending: isPendingRegisterTransaction,
	} = useMutation({
		mutationFn: handleRegisterTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
		},
	});

	async function handleRegisterTransaction(
		registerData: RegisterTransactionData
	) {
		const { data } = await api.post<RegisterTransactionResponse>(
			`/companies/${company?.id}/transactions`,
			{
				...registerData,
			}
		);
		return data;
	}

	return { registerTransaction, isPendingRegisterTransaction };
}
