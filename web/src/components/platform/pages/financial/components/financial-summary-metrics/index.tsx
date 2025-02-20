"use client";

import { useGetFinancialSummaryFromCompany } from "@/hooks/financial/use-get-financial-summary-from-company";
import { TotalTransactionsCard } from "@/components/platform/pages/financial/components/financial-summary-metrics/total-transactions-card";
import { IncomeTransactionsCard } from "@/components/platform/pages/financial/components/financial-summary-metrics/income-transactions-card";
import { ExpenseTransactionsCard } from "@/components/platform/pages/financial/components/financial-summary-metrics/expense-transactions-card";
import { SummaryTransactionsAmountCard } from "@/components/platform/pages/financial/components/financial-summary-metrics/summary-transactions-amount-card";
import { PercentageTransactionsCard } from "@/components/platform/pages/financial/components/financial-summary-metrics/percentage-transactions-card";
import { SkeletonFinancialSummaryMetrics } from "@/components/platform/pages/financial/components/financial-summary-metrics/skeleton-financial-summary-metrics";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export function FinancialSummaryMetrics() {
	const { data, isGetFinancialSummaryFromCompanyPending } =
		useGetFinancialSummaryFromCompany();

	if (isGetFinancialSummaryFromCompanyPending) {
		return <SkeletonFinancialSummaryMetrics />;
	}

	return (
		<section className="w-full h-full flex flex-col gap-4 overflow-x-hidden">
			<Carousel
				opts={{
					dragFree: true,
					align: "start",
				}}
				className="w-full"
			>
				<CarouselContent className="w-full ml-0.5 xl:ml-0 gap-2">
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<TotalTransactionsCard
							totalTransactions={data?.totalTransactions ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<PercentageTransactionsCard
							percentageTransactions={data?.percentage ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<IncomeTransactionsCard
							incomeTransactions={data?.totalIncomeInCents ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<ExpenseTransactionsCard
							expenseTransactions={data?.totalExpenseInCents ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<SummaryTransactionsAmountCard
							summaryTransactionsAmount={data?.summary ?? 0}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
