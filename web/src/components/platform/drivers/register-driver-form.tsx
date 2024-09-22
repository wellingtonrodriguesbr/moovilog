"use client";

import {
	Form,
	FormControl,
	FormDescription,
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
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useValidateCompanyDocumentNumber } from "@/hooks/use-validate-company-document-number";
import { formatCNPJ } from "@/utils/format-cnpj";
import { useRegisterCompany } from "@/hooks/use-register-company";

const formSchema = z.object({
	documentNumber: z
		.string()
		.min(14, { message: "Digite um CNPJ válido" })
		.max(14, { message: "Digite um CNPJ válido" }),
	name: z.string().min(3, { message: "Digite seu nome completo" }),
	type: z.enum(["HEADQUARTERS", "BRANCH", "AGENCY"]),
	size: z.enum(["MICRO", "SMALL", "MEDIUM", "BIG"]),
	acceptTerms: z.boolean({ message: "Aceite os termos para prosseguir" }),
});

export function RegisterDriverForm() {
	const router = useRouter();
	const { registerCompany, isPendingRegisterCompany } = useRegisterCompany();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			documentNumber: "",
			name: "",
			type: undefined,
			size: undefined,
			acceptTerms: false,
		},
	});
	const documentNumber = form.watch("documentNumber");

	const { isValidateCompanyDocumentNumberPending, status } =
		useValidateCompanyDocumentNumber({
			documentNumber,
		});

	async function onSubmit({
		name,
		documentNumber,
		type,
		size,
	}: z.infer<typeof formSchema>) {
		try {
			await registerCompany({ name, documentNumber, type, size });
			router.push("/cadastro/empresa/endereco");
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
					name="documentNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0"
										placeholder="00.000.000-00"
										autoComplete="off"
										{...field}
										onChange={({ currentTarget }) =>
											form.setValue(
												"documentNumber",
												currentTarget.value
											)
										}
										value={formatCNPJ(field.value)}
									/>
									{documentNumber.length === 14 &&
									isValidateCompanyDocumentNumberPending ? (
										<Loader2 className="size-4 text-app-blue-500 animate-spin" />
									) : null}
									{!isValidateCompanyDocumentNumberPending &&
									status === "error" ? (
										<X className="size-4 text-red-500" />
									) : null}
									{!isValidateCompanyDocumentNumberPending &&
									status === "success" ? (
										<Check className="size-4 text-emerald-500" />
									) : null}
								</div>
							</FormControl>
							<FormDescription>
								Digite apenas os números, sem traços ou pontos
							</FormDescription>
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
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
							<FormLabel>Celular</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
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
							<FormLabel>Celular reserva (opcional)</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={
						isValidateCompanyDocumentNumberPending ||
						isPendingRegisterCompany
					}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isPendingRegisterCompany ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<>
							Avançar
							<ArrowRight className="size-4" />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
