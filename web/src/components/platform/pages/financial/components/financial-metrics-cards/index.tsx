"use client";

import { TotalTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/total-transactions-card";
import { IncomeTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/income-transactions-card";
import { ExpenseTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/expense-transactions-card";
import { SummaryTransactionsAmountCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/summary-transactions-amount-card";
import { PercentageTransactionsCard } from "@/components/platform/pages/financial/components/financial-metrics-cards/percentage-transactions-card";
import { SkeletonFinancialMetricsCards } from "@/components/platform/pages/financial/components/financial-metrics-cards/skeleton-financial-metrics-cards";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
    <section className="w-full h-full flex flex-col gap-4">
      <Carousel
        opts={{
          dragFree: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="w-full flex xl:grid xl:grid-cols-5 items-center gap-2 px-0 ml-0">
          <CarouselItem className="w-full h-full pl-0 basis-4/6 md:basis-1/2">
            <TotalTransactionsCard totalTransactions={totalTransactions} />
          </CarouselItem>
          <CarouselItem className="w-full h-full pl-0 basis-4/6 md:basis-1/2">
            <PercentageTransactionsCard percentageTransactions={percentage} />
          </CarouselItem>
          <CarouselItem className="w-full h-full pl-0 basis-4/6 md:basis-1/2">
            <IncomeTransactionsCard incomeTransactions={totalIncomeInCents} />
          </CarouselItem>
          <CarouselItem className="w-full h-full pl-0 basis-4/6 md:basis-1/2">
            <ExpenseTransactionsCard expenseTransactions={totalExpenseInCents} />
          </CarouselItem>
          <CarouselItem className="w-full h-full pl-0 basis-4/6 md:basis-1/2">
            <SummaryTransactionsAmountCard summaryTransactionsAmount={totalBalanceInCents} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
