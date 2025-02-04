"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useFetchVehiclesFromCompany } from "@/hooks/vehicle/use-fetch-vehicles-from-company";
import { RegisterVehicleDialog } from "@/components/platform/pages/vehicles/components/register-vehicle-dialog";

interface SelectVehicleProps {
	selectedVehicle: string;
	onChangeSelectedVehicle: (vehicle: string) => void;
}

export function SelectVehicle({
	selectedVehicle,
	onChangeSelectedVehicle,
}: SelectVehicleProps) {
	const { vehiclesFromCompany, isFetchVehiclesFromCompanyPending } =
		useFetchVehiclesFromCompany();
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full bg-white justify-between font-normal"
				>
					{selectedVehicle
						? vehiclesFromCompany.find(
								(vehicle) => vehicle.id === selectedVehicle
							)?.plate
						: "Selecione o veículo"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Pesquise um veículo.." />
					<CommandList>
						<CommandEmpty className="flex flex-col gap-4 p-4 items-center">
							Nenhum veículo encontrado.
							<RegisterVehicleDialog />
						</CommandEmpty>
						<CommandGroup>
							{vehiclesFromCompany.map((vehicle) => (
								<CommandItem
									key={vehicle.id}
									value={vehicle.id}
									onSelect={(currentValue) => {
										onChangeSelectedVehicle(
											currentValue === selectedVehicle
												? ""
												: currentValue
										);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4 text-app-blue-500",
											selectedVehicle === vehicle.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{vehicle.plate}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
