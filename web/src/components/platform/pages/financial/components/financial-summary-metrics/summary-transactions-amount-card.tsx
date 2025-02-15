import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { PiggyBank } from "lucide-react";

interface SummaryTransactionsAmountCardProps {
	summaryTransactionsAmount: number;
}

export function SummaryTransactionsAmountCard({
	summaryTransactionsAmount,
}: SummaryTransactionsAmountCardProps) {
	return (
		<Card className="col-span-1 md:col-span-2 xl:col-span-1 h-48 bg-app-blue-50 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-app-blue-600">
					{formatCurrencyBR(summaryTransactionsAmount)}
				</CardTitle>
				<CardDescription className="text-app-blue-600">
					Valor restante em caixa
				</CardDescription>
				<PiggyBank className="size-8 absolute top-4 right-4 text-app-blue-600" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
