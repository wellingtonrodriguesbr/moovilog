import { TableCell, TableRow } from "@/components/ui/table";
import { formatPlate } from "@/utils/format-plate";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { formatWeight } from "@/utils/format-weight";
import { Vehicle } from "@/interfaces";
import { VehicleDropdownOptions } from "@/components/platform/pages/vehicles/components/vehicle-dropdown-options";
import { Badge } from "@/components/ui/badge";

interface VehcilesTableRowProps {
	vehicle: Vehicle;
}

const VEHICLE_TYPES: Record<string, string> = {
	OWN: "Próprio",
	AGGREGATE: "Agregado",
	RENTED: "Alugado",
};

const VEHICLE_STATUS: Record<string, string> = {
	ACTIVE: "Ativo",
	INACTIVE: "Inativo",
	MAINTENANCE: "Em Manutenção",
	RESERVED: "Reservado",
	BROKEN: "Com defeito",
};

const VEHICLE_BODIES: Record<string, string> = {
	CLOSED: "Fechado",
	OPEN: "Aberto",
	SIDER: "Sider",
	REFRIGERATED: "Refrigerado",
	BUCKET: "Caçamba",
	TANK: "Tanque",
	BULK_CARRIER: "Graneleiro",
	LIVESTOCK: "Gaiola (Transporte de Animais)",
	FLATBED: "Plataforma",
	CONTAINER: "Porta-Contêiner",
	WOOD: "Transporte de Madeira",
	CAR_CARRIER: "Cegonheira",
};

const VEHICLE_CATEGORIES: Record<string, string> = {
	UTILITY: "Utilitário",
	VAN: "Van",
	LIGHT_TRUCKS: "3/4",
	STRAIGHT_TRUCKS: "Toco",
	TRUCKS: "Truck",
	QUAD_AXLE_TRUCKS: "Quarto Eixo",
	SEMI_TRAILER: "Carreta",
	B_TRAIN: "Bitrem",
	ROAD_TRAIN: "Rodotrem",
};

const STATUS_COLORS = {
	ACTIVE: "text-emerald-500 bg-emerald-500/15",
	INACTIVE: "text-rose-500 bg-rose-500/15",
	MAINTENANCE: "text-amber-500 bg-amber-500/15",
	RESERVED: "text-sky-500 bg-sky-500/15",
	BROKEN: "text-rose-500 bg-rose-500/15",
};

export function VehiclesTableRow({ vehicle }: VehcilesTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">
				{formatPlate(vehicle.plate)}
			</TableCell>
			<TableCell className="text-nowrap">
				{vehicle.trailerPlate ? formatPlate(vehicle.trailerPlate) : "-"}
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
				<Badge
					data-active={vehicle.status === "ACTIVE"}
					data-inactive={vehicle.status === "INACTIVE"}
					data-pending={vehicle.status === "MAINTENANCE"}
					className={STATUS_COLORS[vehicle.status]}
				>
					{VEHICLE_STATUS[vehicle.status]}
				</Badge>
			</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(vehicle.createdAt.toString())}
			</TableCell>
			<TableCell className="text-right">
				<VehicleDropdownOptions vehicle={vehicle} />
			</TableCell>
		</TableRow>
	);
}
