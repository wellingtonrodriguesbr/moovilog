import { Skeleton } from "@/components/ui/skeleton";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export function SkeletonFinancialMetricsCards() {
	return (
		<section className="w-full h-full flex flex-col gap-4">
			<Carousel
				opts={{
					dragFree: true,
					align: "start",
				}}
				className="w-full"
			>
				<CarouselContent className="w-full ml-0.5 xl:ml-0 gap-2">
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					</CarouselItem>
					<CarouselItem className="w-fit basis-[260px] md:basis-[318px] pl-0">
						<Skeleton className="w-[250px] md:w-full h-48 rounded-lg" />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
