"use client";

import { useGetFinancialSummaryFromCompany } from "@/hooks/financial/use-get-financial-summary-from-company";
import { TotalTransactionsCard } from "./total-transactions-card";
import { IncomeTransactionsCard } from "./income-transactions-card";
import { ExpenseTransactionsCard } from "./expense-transactions-card";
import { SummaryTransactionsAmountCard } from "./summary-transactions-amount-card";
import { PercentageTransactionsCard } from "./percentage-transactions-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export function FinancialSummaryMetrics() {
	const { data, isGetFinancialSummaryFromCompanyPending } =
		useGetFinancialSummaryFromCompany();

	if (isGetFinancialSummaryFromCompanyPending) {
		return (
			<section className="w-full h-full flex flex-col gap-4">
				<div className="w-full grid grid-cols-5 gap-4 overflow-hidden">
					<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
				</div>
			</section>
		);
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
					<CarouselItem className="w-fit basis-[250px] md:basis-[318px] pl-0">
						<TotalTransactionsCard
							totalTransactions={data?.totalTransactions ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[250px] md:basis-[318px] pl-0">
						<PercentageTransactionsCard
							percentageTransactions={data?.percentage ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[250px] md:basis-[318px] pl-0">
						<IncomeTransactionsCard
							incomeTransactions={data?.totalIncomeInCents ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[250px] md:basis-[318px] pl-0">
						<ExpenseTransactionsCard
							expenseTransactions={data?.totalExpenseInCents ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[250px] md:basis-[318px] pl-0">
						<SummaryTransactionsAmountCard
							summaryTransactionsAmount={data?.summary ?? 0}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
