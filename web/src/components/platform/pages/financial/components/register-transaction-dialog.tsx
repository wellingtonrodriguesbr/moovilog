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

import { Plus } from "lucide-react";

export function RegisterTransactionDialog() {
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4" />
					Cadastrar transação
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Novo cadastro</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para cadastrar uma nova
						transação
					</DialogDescription>
				</DialogHeader>
				{/* <RegisterDriverForm onCloseDialog={handleCloseDialog} /> */}
			</DialogContent>
		</Dialog>
	);
}
