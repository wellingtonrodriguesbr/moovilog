import { Button } from "@/components/ui/button";
import { VehiclesTable } from "@/components/platform/vehicles/vehicles-table";

import { Plus } from "lucide-react";

export function Vehicles() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Veículos</h1>
				<Button className="gap-2">
					<Plus className="size-4" />
					Adicionar novo
				</Button>
			</header>
			<div className="mt-12">
				<VehiclesTable />
			</div>
		</section>
	);
}
