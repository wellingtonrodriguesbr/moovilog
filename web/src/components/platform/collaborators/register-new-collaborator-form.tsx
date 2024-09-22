"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
/* import { Loader2 } from "lucide-react"; */
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
	name: z.coerce.string().min(8, { message: "Digite o nome completo" }),
	email: z.string().email({ message: "Digite um e-mail válido" }),
	sector: z.string(),
	role: z.string(),
});

export function RegisterNewCollaboratorForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	async function onSubmit({
		name,
		email,
		sector,
		role,
	}: z.infer<typeof formSchema>) {
		console.log({
			name,
			email,
			sector,
			role,
		});
		try {
			toast.success("Endereço cadastrado com sucesso");
			router.push("/cadastro/empresa/membro");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0"
										placeholder=""
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="col-span-3">
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="colaborador@email.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="sector"
					render={({ field }) => (
						<FormItem className="col-span-3">
							<FormLabel>Setor</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Administrativo, Controladoria, Logística.."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cargo</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione o cargo" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="OPERATIONAL">
										Operacional
									</SelectItem>
									<SelectItem value="FINANCIAL">
										Financeiro
									</SelectItem>
									<SelectItem value="COMERCIAL">
										Comercial
									</SelectItem>
									<SelectItem value="ADMIN">
										Administrador
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					// disabled={
					//   isPendingRegisterCompanyAddress || isPendingGetCompanyAddress
					// }
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{/* {false ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Enviar convite"
					)} */}
				</Button>
			</form>
		</Form>
	);
}
