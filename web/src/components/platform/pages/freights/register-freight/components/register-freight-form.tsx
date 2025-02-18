"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { SelectDriver } from "@/components/platform/select-driver";
import { SelectVehicle } from "@/components/platform/select-vehicle";
import { SelectRoute } from "@/components/platform/select-route";
import { useRegisterFreight } from "@/hooks/freight/use-register-freight";
import { Loader2 } from "lucide-react";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { formatWeight } from "@/utils/format-weight";

const formSchema = z.object({
	observation: z.string().optional().nullable(),
	pickupsQuantity: z.coerce.string().optional().nullable(),
	deliveriesQuantity: z.coerce.number({
		message: "Digite a quantidade de entregas",
	}),
	totalWeightOfPickups: z.coerce.number().optional().nullable(),
	totalWeightOfDeliveries: z.coerce.number({
		message: "Digite o total de peso",
	}),
	freightAmountInCents: z
		.string({ message: "Digite o valor do frete" })
		.transform((value) => {
			const formattedValue = value.replace(/\D/g, "");
			return Number(formattedValue);
		}),
	driverId: z.string().uuid({ message: "Selecione um motorista" }),
	vehicleId: z.string().uuid({ message: "Selecione um veículo" }),
	routeId: z.string().uuid({ message: "Selecione uma rota" }),
	date: z.coerce.date(),
	paymentDate: z.coerce.date({
		errorMap: () => ({ message: "Selecione uma data" }),
	}),
	modality: z.enum(
		[
			"DAILY",
			"PERCENTAGE",
			"PRODUCTIVITY",
			"FLAT_RATE",
			"WEIGHT_BASED",
			"DISTANCE_BASED",
			"TIME_BASED",
			"PER_STOP",
			"ZONE_BASED",
		],
		{ message: "Selecione uma modalidade" }
	),
	type: z.enum(["FRACTIONAL", "DEDICATED", "EXPRESS", "TRANSFER"], {
		message: "Selecione um tipo",
	}),
});

export function RegisterFreightForm() {
	const router = useRouter();
	const { registerFreight, isPendingRegisterFreight } = useRegisterFreight();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			observation: null,
			pickupsQuantity: undefined,
			deliveriesQuantity: undefined,
			totalWeightOfPickups: undefined,
			totalWeightOfDeliveries: undefined,
			freightAmountInCents: undefined,
			driverId: "",
			vehicleId: "",
			routeId: "",
			date: new Date(),
			paymentDate: undefined,
			modality: undefined,
			type: undefined,
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			const freight = await registerFreight({ ...registerData });
			router.push(`/fretes/${freight.id}/coletas`);
			toast.success("Frete cadastrado com sucesso");
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
				<fieldset className="grid grid-cols-1 xl:grid-cols-4 gap-4">
					<FormField
						control={form.control}
						name="deliveriesQuantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantidade de entregas</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="totalWeightOfDeliveries"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Peso total de entregas</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={formatWeight(field.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="driverId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Motorista</FormLabel>
								<SelectDriver
									selectedDriver={field.value}
									onChangeSelectedDriver={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="vehicleId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Veículo</FormLabel>
								<SelectVehicle
									selectedVehicle={field.value}
									onChangeSelectedVehicle={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="grid grid-cols-1 xl:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="freightAmountInCents"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Valor do frete</FormLabel>
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
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col my-[10px]">
								<FormLabel>Data do frete</FormLabel>
								<DatePicker
									selectedDate={field.value}
									onChangeSelectedDate={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="paymentDate"
						render={({ field }) => (
							<FormItem className="flex flex-col my-0 md:my-[10px]">
								<FormLabel>
									Data de pagamento do frete
								</FormLabel>
								<DatePicker
									selectedDate={field.value}
									onChangeSelectedDate={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo</FormLabel>
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
										<SelectItem value="FRACTIONAL">
											Fracionado
										</SelectItem>
										<SelectItem value="DEDICATED">
											Dedicado
										</SelectItem>
										<SelectItem value="EXPRESS">
											Entrega rápida
										</SelectItem>
										<SelectItem value="TRANSFER">
											Transferência
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="modality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Modalidade de pagamento</FormLabel>
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
										<SelectItem value="DAILY">
											Diária
										</SelectItem>
										<SelectItem value="PERCENTAGE">
											Porcentagem
										</SelectItem>
										<SelectItem value="PRODUCTIVITY">
											Produtividade
										</SelectItem>
										<SelectItem value="FLAT_RATE">
											Taxa Fixa
										</SelectItem>
										<SelectItem value="WEIGHT_BASED">
											Por Peso
										</SelectItem>
										<SelectItem value="DISTANCE_BASED">
											Por Distância
										</SelectItem>
										<SelectItem value="TIME_BASED">
											Por Tempo
										</SelectItem>
										<SelectItem value="PER_STOP">
											Por Parada
										</SelectItem>
										<SelectItem value="ZONE_BASED">
											Por Zona
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="routeId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rota</FormLabel>
								<SelectRoute
									selectedRoute={field.value}
									onChangeSelectedRoute={field.onChange}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<FormField
					control={form.control}
					name="observation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observação (Opcional)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Coloque alguma informação que achar relevante aqui para ser consultada pelo motorista ou ajudante."
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
					<Button type="button" variant="destructive-outline" asChild>
						<Link href="/fretes">Cancelar</Link>
					</Button>
					<Button disabled={isPendingRegisterFreight} type="submit">
						{isPendingRegisterFreight ? (
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
