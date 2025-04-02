"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useFetchVehiclesFromCompany } from "@/hooks/vehicle/use-fetch-vehicles-from-company";
import { VehicleMetricsCard } from "./vehicle-metrics-card";
import { SkeletonVehiclesMetrics } from "./skeleton-vehicles-metrics";
import {
	Skull,
	ThumbsDown,
	ThumbsUp,
	TriangleAlert,
	Truck,
	Wrench,
} from "lucide-react";

export function VehiclesMetrics() {
	const { vehiclesFromCompany, isFetchVehiclesFromCompanyPending } =
		useFetchVehiclesFromCompany();

	if (isFetchVehiclesFromCompanyPending) {
		return <SkeletonVehiclesMetrics />;
	}

	const totalActiveVehicles = vehiclesFromCompany.filter(
		(vehicle) => vehicle.status === "ACTIVE"
	);
	const totalInactiveVehicles = vehiclesFromCompany.filter(
		(vehicle) => vehicle.status === "INACTIVE"
	);
	const totalVehiclesInMaintenance = vehiclesFromCompany.filter(
		(vehicle) => vehicle.status === "MAINTENANCE"
	);
	const totalVehiclesReserved = vehiclesFromCompany.filter(
		(vehicle) => vehicle.status === "RESERVED"
	);
	const totalVehiclesBroken = vehiclesFromCompany.filter(
		(vehicle) => vehicle.status === "BROKEN"
	);

	return (
		<section className="w-full h-full flex flex-col gap-4 overflow-x-hidden">
			<Carousel
				opts={{
					dragFree: true,
					align: "start",
				}}
				className="w-full"
			>
				<CarouselContent className="w-full flex xl:grid xl:grid-cols-6 items-center gap-2 px-0 ml-0">
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Veículos cadastrados"
							icon={Truck}
							total={vehiclesFromCompany.length}
						/>
					</CarouselItem>
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Ativos"
							icon={ThumbsUp}
							total={totalActiveVehicles.length}
						/>
					</CarouselItem>
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Inativos"
							icon={ThumbsDown}
							total={totalInactiveVehicles.length}
						/>
					</CarouselItem>
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Em manutenção"
							icon={Wrench}
							total={totalVehiclesInMaintenance.length}
						/>
					</CarouselItem>
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Reservados"
							icon={TriangleAlert}
							total={totalVehiclesReserved.length}
						/>
					</CarouselItem>
					<CarouselItem className="w-full h-full basis-[200px] md:basis-1/4 xl:basis-[264px] pl-0">
						<VehicleMetricsCard
							description="Com defeito"
							icon={Skull}
							total={totalVehiclesBroken.length}
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</section>
	);
}
