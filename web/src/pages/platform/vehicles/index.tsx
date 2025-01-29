import { VehiclesTable } from "@/pages/platform/vehicles/components/vehicles-table";
import { RegisterVehicleDialog } from "@/pages/platform/vehicles/components/register-vehicle-dialog";

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
