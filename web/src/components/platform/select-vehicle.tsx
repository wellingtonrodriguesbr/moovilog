"use client";

import { useState } from "react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useFetchVehiclesFromCompany } from "@/hooks/vehicle/use-fetch-vehicles-from-company";
import { RegisterVehicleDialog } from "@/components/platform/pages/vehicles/components/register-vehicle-dialog";
import { cn } from "@/lib/cn";
import { Check, ChevronsUpDown } from "lucide-react";

interface SelectVehicleProps {
	selectedVehicle: string;
	onChangeSelectedVehicle: (vehicle: string) => void;
}

export function SelectVehicle({
	selectedVehicle,
	onChangeSelectedVehicle,
}: SelectVehicleProps) {
	const [open, setOpen] = useState(false);
	const { vehiclesFromCompany, isFetchVehiclesFromCompanyPending } =
		useFetchVehiclesFromCompany();

	function handleSelectVehicle(currentValue: string) {
		const selectedVehicleObj = vehiclesFromCompany.find(
			(vehicle) => vehicle.plate === currentValue
		);

		if (selectedVehicleObj) {
			onChangeSelectedVehicle(
				selectedVehicleObj.id === selectedVehicle
					? ""
					: selectedVehicleObj.id
			);
		}

		setOpen(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={isFetchVehiclesFromCompanyPending}
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
			<PopoverContent className="w-full p-0" align="start">
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
									value={vehicle.plate}
									onSelect={(currentValue) =>
										handleSelectVehicle(currentValue)
									}
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
							<CommandSeparator className="my-2 border-b" />
							<RegisterVehicleDialog buttonWidthFull />
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
