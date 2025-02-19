"use client";

import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { useFetchDriversFromCompany } from "@/hooks/driver/use-fetch-drivers-from-company";
import { RegisterDriverDialog } from "@/components/platform/pages/drivers/components/register-driver-dialog";
import { cn } from "@/lib/cn";
import { Check, ChevronsUpDown } from "lucide-react";

interface SelectDriverProps {
	selectedDriver: string;
	onChangeSelectedDriver: (driver: string) => void;
}

export function SelectDriver({
	selectedDriver,
	onChangeSelectedDriver,
}: SelectDriverProps) {
	const [open, setOpen] = useState(false);
	const { driversFromCompany, isFetchDriversFromCompanyPending } =
		useFetchDriversFromCompany();

	function handleSelectDriver(currentValue: string) {
		const selectedDriverObj = driversFromCompany.find(
			(driver) => driver.name === currentValue
		);

		if (selectedDriverObj) {
			onChangeSelectedDriver(
				selectedDriverObj.id === selectedDriver
					? ""
					: selectedDriverObj.id
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
					disabled={isFetchDriversFromCompanyPending}
					className="w-full bg-white justify-between font-normal"
				>
					{selectedDriver
						? driversFromCompany.find(
								(driver) => driver.id === selectedDriver
							)?.name
						: "Selecione o motorista"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full md:w-[400px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Pesquise um motorista.." />
					<CommandList>
						<CommandEmpty className="flex flex-col gap-4 p-4 items-center">
							Nenhum motorista encontrado.
							<RegisterDriverDialog />
						</CommandEmpty>
						<CommandGroup>
							{driversFromCompany.map((driver) => (
								<CommandItem
									key={driver.id}
									value={driver.name}
									onSelect={(currentValue) =>
										handleSelectDriver(currentValue)
									}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4 text-app-blue-500",
											selectedDriver === driver.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{driver.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
