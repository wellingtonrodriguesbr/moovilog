"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
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
				<div className="grid gap-4 grid-cols-7 overflow-x-hidden">
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
					<Skeleton className="h-36 w-[150px] md:w-full rounded-lg" />
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
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalFreightsCard
							totalFreights={summary?.totalFreights ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalDeliveriesCard
							totalDeliveries={summary?.totalDeliveries ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalWeightDeliveriesCard
							totalWeightDeliveries={
								summary?.totalWeightOfDeliveries ?? 0
							}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalPickupsCard
							totalPickups={summary?.totalPickups ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalWeightPickupsCard
							totalWeightPickups={
								summary?.totalWeightOfPickups ?? 0
							}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalPickupsCard
							totalPickups={summary?.totalPickups ?? 0}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[225px] pl-0">
						<TotalFreightsAmountCard
							totalFreightsAmount={
								summary?.totalFreightsAmount ?? 0
							}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
