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
// import { useRegisterPickup } from "@/hooks/pickup/use-register-pickup";
import { Loader2 } from "lucide-react";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { formatWeight } from "@/utils/format-weight";
import { Card } from "@/components/ui/card";

const formSchema = z
	.object({
		observation: z.string().optional().nullable(),
		deliveriesQuantity: z.coerce.number({
			message: "Digite a quantidade de entregas",
		}),
		totalWeightOfDeliveries: z.coerce.number({
			message: "Digite o total de peso",
		}),
		pickupAmountInCents: z
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
	})
	.refine(
		(data) => {
			if (data.paymentDate < data.date) {
				return false;
			}
			return true;
		},
		{
			path: ["paymentDate"],
			message:
				"A data de pagamento não pode ser anterior à data do frete.",
		}
	);

export function RegisterPickupForm() {
	const router = useRouter();
	// const { registerPickup, isPendingRegisterPickup } = useRegisterPickup();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			observation: null,
			deliveriesQuantity: undefined,
			totalWeightOfDeliveries: 0,
			pickupAmountInCents: undefined,
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
			// const pickup = await registerPickup({ ...registerData });
			// router.push(`/fretes/${pickup.id}/coletas`);
			router.push(`/fretes`);
			toast.success("Frete cadastrado com sucesso");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 403) {
					toast.error(
						"Você não tem permissão para esta ação, fale com seu gestor."
					);
					router.push("/fretes");
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
				className="flex flex-col gap-2 w-full"
			>
				<Card className="flex flex-col gap-4 p-6 bg-white border">
					<fieldset className="grid grid-cols-1 xl:grid-cols-[auto_1fr_100px] gap-4">
						<FormField
							control={form.control}
							name="deliveriesQuantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										CEP do local da coleta
									</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
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
									<FormLabel>Rua</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
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
									<FormLabel>Número</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid grid-cols-1 xl:grid-cols-[auto_auto_auto_60px] gap-4">
						<FormField
							control={form.control}
							name="totalWeightOfDeliveries"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bairro</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
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
									<FormLabel>Complemento</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
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
									<FormLabel>Cidade</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
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
									<FormLabel>UF</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
				</Card>
				<Card className="flex flex-col gap-4 p-6 bg-white border">
					<fieldset className="grid grid-cols-1 xl:grid-cols-[auto_1fr_1fr] gap-4">
						<FormField
							control={form.control}
							name="deliveriesQuantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número da coleta</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
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
									<FormLabel>Nome do remetente</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
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
									<FormLabel>Nome do destinatário</FormLabel>
									<FormControl>
										<Input type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid grid-cols-1 xl:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="pickupAmountInCents"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantidade volumes</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="pickupAmountInCents"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Peso total</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="pickupAmountInCents"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cubagem</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid grid-cols-1 xl:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col my-[10px]">
									<FormLabel>Solicitada em</FormLabel>
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
									<FormLabel>Programada para</FormLabel>
									<DatePicker
										selectedDate={field.value}
										onChangeSelectedDate={field.onChange}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
						<Button
							type="button"
							variant="destructive-outline"
							asChild
						>
							<Link href="/fretes">Cancelar</Link>
						</Button>
						<Button disabled type="submit">
							Cadastrar
							{/* {false ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								"Cadastrar"
							)} */}
						</Button>
					</fieldset>
				</Card>
			</form>
		</Form>
	);
}
