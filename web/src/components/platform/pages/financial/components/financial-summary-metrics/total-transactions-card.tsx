import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";

interface TotalTransactionsCardProps {
	totalTransactions: number;
}

export function TotalTransactionsCard({
	totalTransactions,
}: TotalTransactionsCardProps) {
	return (
		<Card className="h-48 bg-zinc-100 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-5xl">
					{totalTransactions}
				</CardTitle>
				<CardDescription className="text-zinc-600">
					Total de transações
				</CardDescription>
				<ArrowLeftRight className="size-8 absolute top-4 right-4" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
