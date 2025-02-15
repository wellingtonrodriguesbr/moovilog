"use client";

import { useGetFinancialSummaryFromCompany } from "@/hooks/financial/use-get-financial-summary-from-company";
import { TotalTransactionsCard } from "./total-transactions-card";
import { IncomeTransactionsCard } from "./income-transactions-card";
import { ExpenseTransactionsCard } from "./expense-transactions-card";
import { SummaryTransactionsAmountCard } from "./summary-transactions-amount-card";
import { PercentageTransactionsCard } from "./percentage-transactions-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialSummaryMetrics() {
	const { data, isGetFinancialSummaryFromCompanyPending } =
		useGetFinancialSummaryFromCompany();

	if (isGetFinancialSummaryFromCompanyPending) {
		return (
			<section className="w-full h-full flex flex-col gap-4">
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
					<Skeleton className="h-48 w-full rounded-lg" />
					<Skeleton className="h-48 w-full rounded-lg" />
					<Skeleton className="h-48 w-full rounded-lg" />
					<Skeleton className="h-48 w-full rounded-lg" />
					<Skeleton className="h-48 w-full rounded-lg" />
				</div>
			</section>
		);
	}

	return (
		<section className="w-full h-full flex flex-col gap-4">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
				<TotalTransactionsCard
					totalTransactions={data?.totalTransactions ?? 0}
				/>

				<PercentageTransactionsCard
					percentageTransactions={data?.percentage ?? 0}
				/>

				<IncomeTransactionsCard
					incomeTransactions={data?.totalIncomeInCents ?? 0}
				/>

				<ExpenseTransactionsCard
					expenseTransactions={data?.totalExpenseInCents ?? 0}
				/>

				<SummaryTransactionsAmountCard
					summaryTransactionsAmount={data?.summary ?? 0}
				/>
			</div>
		</section>
	);
}
