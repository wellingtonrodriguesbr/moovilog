import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { DollarSign } from "lucide-react";

interface TotalFreightsAmountCardProps {
	totalFreightsAmount: number;
}

export function TotalFreightsAmountCard({
	totalFreightsAmount,
}: TotalFreightsAmountCardProps) {
	return (
		<Card className="min-h-[140px] h-full bg-app-blue-500 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-2xl text-zinc-50">
					{formatCurrencyBR(totalFreightsAmount)}
				</CardTitle>
				<CardDescription className="text-zinc-50">
					Custo total com fretes
				</CardDescription>
				<DollarSign className="size-6 absolute top-4 right-4 text-zinc-50" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
