"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RegisterNewCollaboratorForm } from "./register-new-collaborator-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function RegisterNewCollaboratorDialog() {
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleCloseDialog() {
		setDialogOpen(false);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button className="gap-2">
					<Plus className="size-4" />
					Adicionar novo
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Novo colaborador</DialogTitle>
					<DialogDescription>
						Ao cadastrar um novo(a) colaborador(a), será enviado um
						e-mail para ele(a) para concluir seu cadastro e acessar
						a plataforma.
					</DialogDescription>
				</DialogHeader>
				<RegisterNewCollaboratorForm
					onCloseDialog={handleCloseDialog}
				/>
			</DialogContent>
		</Dialog>
	);
}
