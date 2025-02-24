"use client";

import { TotalTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/total-transactions-card";
import { IncomeTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/income-transactions-card";
import { ExpenseTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/expense-transactions-card";
import { SummaryTransactionsAmountCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/summary-transactions-amount-card";
import { PercentageTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/percentage-transactions-card";
import { SkeletonFinancialMetricsCards } from "@/components/platform/pages/financial/components/financial-metrics-cards/skeleton-financial-metrics-cards";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useFetchTransactionsFromCompany } from "@/hooks/financial/use-fetch-transactions-from-company";

export function FinancialMetricsCards() {
	const {
		totalTransactions,
		totalIncomeInCents,
		totalExpenseInCents,
		totalBalanceInCents,
		percentage,
		isFetchTransactionsFromCompanyPending,
	} = useFetchTransactionsFromCompany();

	if (isFetchTransactionsFromCompanyPending) {
		return <SkeletonFinancialMetricsCards />;
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
							totalTransactions={totalTransactions}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<PercentageTransactionsCard
							percentageTransactions={percentage}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<IncomeTransactionsCard
							incomeTransactions={totalIncomeInCents}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<ExpenseTransactionsCard
							expenseTransactions={totalExpenseInCents}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<SummaryTransactionsAmountCard
							summaryTransactionsAmount={totalBalanceInCents}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
