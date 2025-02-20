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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useValidateCompanyDocumentNumber } from "@/hooks/use-validate-company-document-number";
import { formatCNPJ } from "@/utils/format-cnpj";
import { useRegisterCompany } from "@/hooks/company/use-register-company";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCallback, useEffect, useRef } from "react";

const formSchema = z.object({
	documentNumber: z
		.string()
		.min(14, { message: "Digite um CNPJ válido" })
		.max(14, { message: "Digite um CNPJ válido" })
		.transform((value) => value.replace(/\D/g, "")),
	name: z.string().min(3, { message: "Digite seu nome completo" }),
	size: z.enum(["MICRO", "SMALL", "MEDIUM", "BIG"]),
	acceptTerms: z.boolean({ message: "Aceite os termos para prosseguir" }),
});

export function RegisterCompanyForm() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { registerCompany, isPendingRegisterCompany } = useRegisterCompany();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			documentNumber: "",
			name: "",
			size: undefined,
			acceptTerms: false,
		},
	});
	const documentNumber = form.watch("documentNumber");

	const {
		companyInformation,
		isValidateCompanyDocumentNumberPending,
		status,
	} = useValidateCompanyDocumentNumber({
		documentNumber,
	});

	async function onSubmit({
		name,
		documentNumber,
		size,
	}: z.infer<typeof formSchema>) {
		try {
			await registerCompany({ name, documentNumber, size });
			toast.success("Empresa cadastrada com sucesso");
			router.push("/cadastro/empresa/endereco");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					toast.error("Você não tem permissão para esta ação");
				} else if (
					error.response?.status === 409 &&
					error.response.data.message ===
						"A company already exists with this document number"
				) {
					toast.error(
						"Já existe uma empresa cadastrada com este CNPJ"
					);
				} else if (
					error.response?.status === 409 &&
					error.response.data.message ===
						"User already owns a company. Conflict with existing resource."
				) {
					toast.error(
						"Você já tem uma empresa cadastrada na plataforma."
					);
				}
			}
		}
	}

	useEffect(() => {
		form.setValue("name", companyInformation?.razao_social ?? "");

		if (form.watch("name").length && inputRef.current) {
			inputRef.current.blur();
		}

		if (status === "error") {
			form.reset();
		}
	}, [companyInformation, form, status]);

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
							<FormLabel>CNPJ</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0"
										placeholder="00.000.000/0000-00"
										maxLength={14}
										autoComplete="off"
										inputMode="numeric"
										pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}"
										{...field}
										onChange={({ currentTarget }) =>
											form.setValue(
												"documentNumber",
												currentTarget.value
											)
										}
										ref={inputRef}
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
							<FormLabel>Razão social</FormLabel>
							<FormControl>
								<Input
									disabled={
										isValidateCompanyDocumentNumberPending ||
										status === "pending"
									}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="size"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tamanho</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								disabled={
									isValidateCompanyDocumentNumberPending ||
									status === "pending"
								}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione o tamanho da sua empresa" />
									</SelectTrigger>
								</FormControl>
								<SelectContent
									className="max-w-[320px] md:max-w-full"
									align="center"
								>
									<SelectItem value="MICRO">
										Microempresa (Faturamento anual de até
										R$ 360mil)
									</SelectItem>
									<SelectItem value="SMALL">
										Pequena empresa (Faturamento anual de
										até R$ 4.8 milhões)
									</SelectItem>
									<SelectItem value="MEDIUM">
										Média empresa (Faturamento anual de até
										R$ 300 milhões)
									</SelectItem>
									<SelectItem value="BIG">
										Grande empresa (Faturamento anual
										ultrapassa R$ 300 milhões)
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FormLabel
									htmlFor={field.name}
									className="flex items-center gap-2 text-sm font-medium"
								>
									<Checkbox
										id={field.name}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									Ao cadastrar sua empresa, você concorda com
									os termos e a política de privacidade da
									plataforma.
								</FormLabel>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={
						!form.watch("acceptTerms") ||
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
