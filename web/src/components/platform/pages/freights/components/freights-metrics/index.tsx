"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { TotalFreightsCard } from "@/components/platform/pages/freights/components/freights-metrics/total-freights-card";
import { TotalDeliveriesCard } from "@/components/platform/pages/freights/components/freights-metrics/total-deliveries-card";
import { TotalPickupsCard } from "@/components/platform/pages/freights/components/freights-metrics/total-pickups-card";
import { TotalWeightPickupsCard } from "@/components/platform/pages/freights/components/freights-metrics/total-weight-pickups-card";
import { TotalWeightDeliveriesCard } from "@/components/platform/pages/freights/components/freights-metrics/total-weight-deliveries-card";
import { TotalFreightsAmountCard } from "@/components/platform/pages/freights/components/freights-metrics/total-freights-amount-card";
import { SkeletonFreightsMetrics } from "@/components/platform/pages/freights/components/freights-metrics/skeleton-freights-metrics";
import { useFetchFreightsFromCompany } from "@/hooks/freight/use-fetch-freights-from-company";

export function FreightsMetrics() {
	const {
		totalFreights,
		totalDeliveries,
		totalWeightOfDeliveries,
		totalPickups,
		totalWeightOfPickups,
		totalFreightsAmountInCents,
		isFetchFreightsFromCompanyPending,
	} = useFetchFreightsFromCompany();

	if (isFetchFreightsFromCompanyPending) {
		return <SkeletonFreightsMetrics />;
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
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalFreightsCard totalFreights={totalFreights} />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalDeliveriesCard
							totalDeliveries={totalDeliveries}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalWeightDeliveriesCard
							totalWeightDeliveries={totalWeightOfDeliveries}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalPickupsCard totalPickups={totalPickups} />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalWeightPickupsCard
							totalWeightPickups={totalWeightOfPickups}
						/>
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<TotalFreightsAmountCard
							totalFreightsAmount={totalFreightsAmountInCents}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
