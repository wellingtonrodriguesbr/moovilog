import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonVehiclesMetrics() {
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
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<Skeleton className="h-36 md:w-full rounded-lg" />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
