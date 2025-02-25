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

import { Pencil } from "lucide-react";
import { UpdateDriverForm } from "@/components/platform/pages/drivers/components/update-driver-form";
import { Driver } from "@/interfaces";

interface UpdateDriverDialogProps {
	driver: Driver;
}

export function UpdateDriverDialog({ driver }: UpdateDriverDialogProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<button className="relative flex cursor-pointer hover:bg-zinc-100 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 gap-2">
					<Pencil className="size-4" />
					Editar motorista
				</button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Editar cadastro do motorista</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e lembre-se sempre de conferir
						os documentos do motorista para evitar erros.
					</DialogDescription>
				</DialogHeader>
				<UpdateDriverForm
					driver={driver}
					onCloseDialog={handleCloseDialog}
				/>
			</DialogContent>
		</Dialog>
	);
}
