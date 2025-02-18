import { TransactionsTable } from "@/components/platform/pages/financial/components/transactions-table";
import { RegisterTransactionDialog } from "@/components/platform/pages/financial/components/register-transaction-dialog";
import { FinancialSummaryMetrics } from "@/components/platform/pages/financial/components/financial-summary-metrics";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import Link from "next/link";

export function Financial() {
	return (
		<section className="flex flex-col gap-12">
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Financeiro</h1>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						className="hover:bg-zinc-100"
						asChild
					>
						<Link href="/financeiro/fechamento">
							<Calculator className="size-4" />
							Fazer fechamento do mês
						</Link>
					</Button>
					<RegisterTransactionDialog />
				</div>
			</header>
			<div className="flex flex-col gap-12">
				<FinancialSummaryMetrics />
				<TransactionsTable />
			</div>
		</section>
	);
}
