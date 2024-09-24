import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { RegisterDriverForm } from "./register-driver-form";

export function RegisterDriverDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="gap-2">
					<Plus className="size-4" />
					<span className="hidden md:block">Adicionar novo</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Novo cadastro</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e lembre-se sempre de conferir
						os documentos do motorista
					</DialogDescription>
				</DialogHeader>
				<RegisterDriverForm />
			</DialogContent>
		</Dialog>
	);
}
