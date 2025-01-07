import { VehiclesTable } from "@/components/platform/vehicles/vehicles-table";
import { RegisterVehicleDialog } from "@/components/platform/vehicles/register-vehicle-dialog";

export function Vehicles() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Veículos</h1>
				<RegisterVehicleDialog />
			</header>
			<div className="mt-12">
				<VehiclesTable />
			</div>
		</section>
	);
}
