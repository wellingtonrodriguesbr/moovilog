import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";

interface SummaryTransactionsAmountCardProps {
	summaryTransactionsAmount: number;
}

export function SummaryTransactionsAmountCard({
	summaryTransactionsAmount,
}: SummaryTransactionsAmountCardProps) {
	return (
		<Card className="col-span-1 md:col-span-2 xl:col-span-1 h-48 bg-app-blue-50">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-app-blue-600">
					{formatCurrencyBR(summaryTransactionsAmount)}
				</CardTitle>
				<CardDescription className="text-app-blue-600">
					Valor final
				</CardDescription>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
