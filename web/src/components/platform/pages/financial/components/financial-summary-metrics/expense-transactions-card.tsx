import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";

interface ExpenseTransactionsCardProps {
	expenseTransactions: number;
}

export function ExpenseTransactionsCard({
	expenseTransactions,
}: ExpenseTransactionsCardProps) {
	return (
		<Card className="h-48 bg-rose-100">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-rose-600">
					{formatCurrencyBR(expenseTransactions)}
				</CardTitle>
				<CardDescription className="text-rose-600">
					Total de despesas
				</CardDescription>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
