"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetFreightsSummaryFromCompany } from "@/hooks/freight/use-get-freights-summary-from-company";
import { TotalFreightsCard } from "./total-freights-card";
import { TotalDeliveriesCard } from "./total-deliveries-card";
import { TotalPickupsCard } from "./total-pickups-card";
import { TotalWeightPickupsCard } from "./total-weight-pickups-card";
import { TotalWeightDeliveriesCard } from "./total-weight-deliveries-card";
import { TotalFreightsAmountCard } from "./total-freights-amount-card";

export function FreightsMetrics() {
	const { summary, isGetFreightsSummaryPending } =
		useGetFreightsSummaryFromCompany();

	if (isGetFreightsSummaryPending) {
		return (
			<section className="w-full h-full flex flex-col gap-4">
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-36 w-full rounded-lg" />
					<Skeleton className="h-36 w-full rounded-lg" />
				</div>
			</section>
		);
	}

	return (
		<section className="w-full h-full flex flex-col gap-4">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
				<TotalFreightsCard
					totalFreights={summary?.totalFreights ?? 0}
				/>

				<TotalDeliveriesCard
					totalDeliveries={summary?.totalDeliveries ?? 0}
				/>

				<TotalWeightDeliveriesCard
					totalWeightDeliveries={
						summary?.totalWeightOfDeliveries ?? 0
					}
				/>

				<TotalPickupsCard totalPickups={summary?.totalPickups ?? 0} />

				<TotalWeightPickupsCard
					totalWeightPickups={summary?.totalWeightOfPickups ?? 0}
				/>
				<TotalFreightsAmountCard
					totalFreightsAmount={summary?.totalFreightsAmount ?? 0}
				/>
			</div>
		</section>
	);
}
