import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { ArrowDownRight } from "lucide-react";

interface ExpenseTransactionsCardProps {
	expenseTransactions: number;
}

export function ExpenseTransactionsCard({
	expenseTransactions,
}: ExpenseTransactionsCardProps) {
	return (
		<Card className="h-48 bg-rose-100 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-rose-600">
					{formatCurrencyBR(expenseTransactions)}
				</CardTitle>
				<CardDescription className="text-rose-600">
					Total de despesas
				</CardDescription>
				<ArrowDownRight className="size-8 absolute top-4 right-4 text-rose-600" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
