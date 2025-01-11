/* eslint-disable no-constant-condition */
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useRegisterRoute } from "@/hooks/use-register-route";
import { toast } from "sonner";

import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

import { Loader2 } from "lucide-react";

interface RegisterRouteFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	name: z.string().min(3, { message: "Digite o nome completo" }),
	documentNumber: z
		.string()
		.min(11, { message: "Digite um CPF válido" })
		.transform((value) => value.replace(/\D/g, ""))
		.transform((cpf) => cpf.slice(0, 11)),
	phone: z
		.string()
		.min(11, { message: "Digite um telefone válido" })
		.transform((value) => value.replace(/\D/g, ""))
		.transform((phone) => phone.slice(0, 11)),
	type: z.enum(["AGGREGATE", "INTERNAL", "FREELANCER"]),
});

export function RegisterRouteForm({ onCloseDialog }: RegisterRouteFormProps) {
	// const { registerRoute, isPendingRegisterRoute } = useRegisterRoute();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			documentNumber: "",
			phone: "",
			type: undefined,
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			// await registerRoute({ ...registerData });
			onCloseDialog();
			toast.success("Rota cadastrada com sucesso");
		} catch (error) {
			console.log(error);
			toast.error("Erro ao cadastrar rota");
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
					name="documentNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0"
										placeholder="000.000.000-00"
										autoComplete="off"
										{...field}
										value={formatCPF(field.value)}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Celular</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="(00) 00000-0000"
									value={formatPhone(field.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de motorista</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma opção" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="INTERNAL">
										Interno
									</SelectItem>
									<SelectItem value="AGGREGATE">
										Agregado
									</SelectItem>
									<SelectItem value="FREELANCER">
										Freelancer
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={false}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{false ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Concluir cadastro"
					)}
				</Button>
			</form>
		</Form>
	);
}
