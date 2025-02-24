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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterTransaction } from "@/hooks/financial/use-register-transaction";
import { useFetchCategories } from "@/hooks/financial/use-fetch-categories";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { SelectDriver } from "@/components/platform/select-driver";

interface RegisterTransactionFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	amountInCents: z
		.string({ message: "Digite o valor da transação" })
		.transform((value) => {
			const formattedValue = value.replace(/\D/g, "");
			return Number(formattedValue);
		}),
	type: z.enum(["INCOME", "EXPENSE"], {
		message: "Selecione um tipo",
	}),
	status: z.enum(["PENDING", "PAID", "OVERDUE"], {
		message: "Selecione um status",
	}),
	dueDate: z.coerce.date({
		errorMap: () => ({ message: "Selecione uma data" }),
	}),
	paymentMethod: z.enum(
		["PIX", "CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER", "OTHER"],
		{
			message: "Selecione um meio de pagamento",
		}
	),
	categoryName: z.string({ message: "Selecione uma categoria" }),
	description: z.string().optional().nullable(),
	driverId: z.string().uuid().optional().nullable(),
});

export function RegisterTransactionForm({
	onCloseDialog,
}: RegisterTransactionFormProps) {
	const { categories, isFetchCategoriesPending } = useFetchCategories();
	const { registerTransaction, isPendingRegisterTransaction } =
		useRegisterTransaction();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amountInCents: undefined,
			type: undefined,
			status: undefined,
			dueDate: new Date(),
			paymentMethod: undefined,
			categoryName: undefined,
			description: null,
			driverId: null,
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			await registerTransaction({ ...registerData });
			onCloseDialog();
			toast.success("Transação cadastrada com sucesso");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 403) {
					toast.error(
						"Você não tem permissão para esta ação, fale com seu gestor."
					);
				} else if (error.response?.status === 404) {
					toast.error(
						"Falha ao cadastrar transação, tente novamente."
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
				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="amountInCents"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Valor</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={formatCurrencyBR(field.value)}
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
								<FormLabel>Tipo da transação</FormLabel>
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
										<SelectItem value="INCOME">
											Entrada
										</SelectItem>
										<SelectItem value="EXPENSE">
											Despesa
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status da transação</FormLabel>
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
										<SelectItem value="PENDING">
											Pendente
										</SelectItem>
										<SelectItem value="PAID">
											Paga
										</SelectItem>
										<SelectItem value="OVERDUE">
											Atrasada
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="categoryName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categoria</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										disabled={isFetchCategoriesPending}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													placeholder={
														isFetchCategoriesPending
															? "Carregando categorias.."
															: "Selecione uma opção"
													}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.name}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="paymentMethod"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Método de pagamento</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione uma opção" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="PIX">PIX</SelectItem>
										<SelectItem value="CREDIT_CARD">
											Cartão de Crédito
										</SelectItem>
										<SelectItem value="DEBIT_CARD">
											Cartão de Débito
										</SelectItem>
										<SelectItem value="CASH">
											Dinheiro
										</SelectItem>
										<SelectItem value="BANK_TRANSFER">
											Transferência Bancária
										</SelectItem>
										<SelectItem value="OTHER">
											Outro
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
								<FormDescription>
									Escolha a forma de pagamento ou recebimento
									para essa transação.
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dueDate"
						render={({ field }) => (
							<FormItem className="flex flex-col my-[10px]">
								<FormLabel>Data de vencimento</FormLabel>
								<FormControl>
									<DatePicker
										selectedDate={field.value}
										onChangeSelectedDate={field.onChange}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>
									Preencha com a data limite para pagar ou
									para receber essa transação.
								</FormDescription>
							</FormItem>
						)}
					/>
				</fieldset>

				{["Coletas e Entregas", "Pedágios", "Combustível"].includes(
					form.watch("categoryName")
				) && (
					<FormField
						control={form.control}
						name="driverId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Motorista</FormLabel>
								<SelectDriver
									selectedDriver={field.value as string}
									onChangeSelectedDriver={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição (Opcional)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Coloque alguma descrição que achar relevante para esta transação, apesar de ser opcional, ela ajudará a identificar melhor do que se trata."
									className="resize-none"
									rows={4}
									{...field}
									value={field.value as string}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<fieldset className="flex gap-2 justify-end mt-6">
					<Button
						type="button"
						variant="destructive-outline"
						onClick={onCloseDialog}
					>
						Cancelar
					</Button>
					<Button
						disabled={isPendingRegisterTransaction}
						type="submit"
					>
						{isPendingRegisterTransaction ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Cadastrar"
						)}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}
