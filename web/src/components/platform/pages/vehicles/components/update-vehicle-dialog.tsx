"use client";

import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateVehicleForm } from "@/components/platform/pages/vehicles/components/update-vehicle-form";

import { Pencil } from "lucide-react";
import { Vehicle } from "@/interfaces";

interface UpdateVehicleDialogProps {
	vehicle: Vehicle;
}

export function UpdateVehicleDialog({ vehicle }: UpdateVehicleDialogProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<button className="w-full relative flex cursor-pointer hover:bg-zinc-100 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 gap-2">
					<Pencil className="size-4" />
					Editar veículo
				</button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] overflow-auto max-h-[80vh] md:max-h-auto md:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Editar cadastro do veículo</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e lembre-se sempre de conferir
						os dados do veículo para evitar erros.
					</DialogDescription>
				</DialogHeader>
				<UpdateVehicleForm
					vehicle={vehicle}
					onCloseDialog={handleCloseDialog}
				/>
			</DialogContent>
		</Dialog>
	);
}
