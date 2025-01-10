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
import { Button } from "@/components/ui/button";
import { RegisterVehicleForm } from "./register-vehicle-form";

import { Plus } from "lucide-react";

export function RegisterVehicleDialog() {
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" />
					Adicionar novo
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] overflow-auto max-h-[95vh] md:max-h-auto md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Novo cadastro de veículo</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e lembre-se sempre de conferir
						os dados do veículo para evitar erros.
					</DialogDescription>
				</DialogHeader>
				<RegisterVehicleForm onCloseDialog={handleCloseDialog} />
			</DialogContent>
		</Dialog>
	);
}
