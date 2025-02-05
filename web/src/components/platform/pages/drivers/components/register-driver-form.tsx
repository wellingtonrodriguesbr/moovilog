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
import { useRegisterDriver } from "@/hooks/driver/use-register-driver";
import { toast } from "sonner";

import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

interface RegisterDriverFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	name: z.string().min(3, { message: "Digite o nome completo" }),
	documentNumber: z
		.string()
		.min(11, { message: "Digite um CPF válido" })
		.max(11, { message: "Digite um CPF válido" })
		.transform((value) => value.replace(/\D/g, ""))
		.transform((cpf) => cpf.slice(0, 11)),
	phone: z
		.string()
		.min(11, { message: "Digite um telefone válido" })
		.transform((value) => value.replace(/\D/g, ""))
		.transform((phone) => phone.slice(0, 11)),
	type: z.enum(["AGGREGATE", "INTERNAL", "FREELANCER"]),
});

export function RegisterDriverForm({ onCloseDialog }: RegisterDriverFormProps) {
	const { registerDriver, isPendingRegisterDriver } = useRegisterDriver();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			documentNumber: "",
			phone: "",
			type: undefined,
		},
	});

	console.log(form.watch("documentNumber"));

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			await registerDriver({ ...registerData });
			onCloseDialog();
			toast.success("Motorista cadastrado com sucesso");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					toast.error(
						"Já existe um motorista com este CPF ou telefone"
					);
				}
			} else {
				toast.error("Erro ao cadastrar motorista");
			}
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

				<fieldset className="flex justify-end gap-4 mt-6">
					<Button
						disabled={isPendingRegisterDriver}
						onClick={onCloseDialog}
						type="button"
						variant="destructive-outline"
					>
						Cancelar
					</Button>
					<Button disabled={isPendingRegisterDriver} type="submit">
						{isPendingRegisterDriver ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Concluir cadastro"
						)}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}
