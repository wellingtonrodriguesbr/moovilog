import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatPlate } from "@/utils/format-plate";
import { Vehicle } from "@/hooks/use-fetch-vehicles-by-company";
import { Ellipsis } from "lucide-react";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { formatWeight } from "@/utils/format-weight";

interface VehcilesTableRowProps {
	vehicle: Vehicle;
}

const VEHICLE_TYPES: Record<string, string> = {
	OWN: "Próprio",
	OUTSOURCED: "Terceirizado",
	RENTED: "Alugado",
};

const VEHICLE_BODIES: Record<string, string> = {
	CLOSED: "Fechado",
	OPEN: "Aberto",
	SIDER: "Sider",
	REFRIGERATED: "Refrigerado",
	BUCKET: "Caçamba",
};

const VEHICLE_CATEGORIES: Record<string, string> = {
	UTILITY: "Utilitário",
	VAN: "Van",
	LIGHT_TRUCKS: "3/4",
	STRAIGHT_TRUCKS: "Toco",
	TRUCKS: "Truck",
	QUAD_AXLE_TRUCKS: "Quarto Eixo",
	SEMI_TRAILER: "Carreta",
	TANDEM_AXLE_TRUCK: "Caminhão Caçamba",
};

export function VehiclesTableRow({ vehicle }: VehcilesTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">
				{formatPlate(vehicle.plate)}
			</TableCell>
			<TableCell className="text-nowrap">{vehicle.brand}</TableCell>
			<TableCell className="text-nowrap">{vehicle.model}</TableCell>
			<TableCell className="text-nowrap">
				{VEHICLE_CATEGORIES[vehicle.category]}
			</TableCell>
			<TableCell className="text-nowrap">
				{VEHICLE_TYPES[vehicle.type]}
			</TableCell>
			<TableCell className="text-nowrap">
				{VEHICLE_BODIES[vehicle.body]}
			</TableCell>
			<TableCell className="text-nowrap">
				{formatWeight(vehicle.fullLoadCapacity)}kg
			</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(vehicle.createdAt)}
			</TableCell>
			<TableCell className="text-right">
				<Button variant="ghost">
					<Ellipsis className="size-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
