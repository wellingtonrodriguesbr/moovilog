import { VehiclesTable } from "@/components/platform/pages/vehicles/components/vehicles-table";
import { RegisterVehicleDialog } from "@/components/platform/pages/vehicles/components/register-vehicle-dialog";
import { VehiclesMetrics } from "./components/vehicles-metrics";

export function Vehicles() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Veículos</h1>
				<RegisterVehicleDialog />
			</header>
			<div className="flex flex-col gap-12 mt-12">
				<VehiclesMetrics />
				<VehiclesTable />
			</div>
		</section>
	);
}
