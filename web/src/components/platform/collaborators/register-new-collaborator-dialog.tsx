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

export function RegisterNewCollaboratorDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="gap-2">
					<Plus className="size-4" />
					<span className="hidden md:block">Adicionar novo</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Novo colaborador</DialogTitle>
					<DialogDescription>
						Ao cadastrar um novo(a) colaborador(a), será enviado um
						e-mail para ele(a) para concluir seu cadastro e acessar
						a plataforma
					</DialogDescription>
				</DialogHeader>
				<RegisterNewCollaboratorForm />
			</DialogContent>
		</Dialog>
	);
}
