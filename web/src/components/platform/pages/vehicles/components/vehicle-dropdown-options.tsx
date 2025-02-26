import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateVehicleStatusDialog } from "@/components/platform/pages/vehicles/components/update-vehicle-status-dialog";
import { UpdateVehicleDialog } from "@/components/platform/pages/vehicles/components/update-vehicle-dialog";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Vehicle } from "@/interfaces";

interface VehicleDropdownOptionsProps {
	vehicle: Vehicle;
}

export function VehicleDropdownOptions({
	vehicle,
}: VehicleDropdownOptionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<Ellipsis className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Configurações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<UpdateVehicleDialog vehicle={vehicle} />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<UpdateVehicleStatusDialog
						currentStatus={vehicle.status}
						vehicleId={vehicle.id}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
