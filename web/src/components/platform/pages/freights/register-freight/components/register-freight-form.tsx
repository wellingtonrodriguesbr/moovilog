"use client";

import Link from "next/link";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	observation: z.string().optional().nullable(),
	pickupsQuantity: z.number().optional().nullable(),
	deliveriesQuantity: z.number(),
	totalWeightOfPickups: z.number().optional().nullable(),
	totalWeightOfDeliveries: z.number(),
	freightAmountInCents: z.number(),
	driverId: z.string().uuid(),
	vehicleId: z.string().uuid(),
	routeId: z.string(),
	date: z.coerce.date(),
	modality: z.enum([
		"DAILY",
		"PERCENTAGE",
		"PRODUCTIVITY",
		"FLAT_RATE",
		"WEIGHT_BASED",
		"DISTANCE_BASED",
		"TIME_BASED",
		"PER_STOP",
		"ZONE_BASED",
	]),
	type: z.enum(["FRACTIONAL", "DEDICATED", "EXPRESS", "TRANSFER"]),
});

export function RegisterFreightForm() {
	// const { registerFreight, isPendingRegisterFreight } = useRegisterFreight();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			observation: null,
			pickupsQuantity: null,
			deliveriesQuantity: undefined,
			totalWeightOfPickups: null,
			totalWeightOfDeliveries: undefined,
			freightAmountInCents: undefined,
			driverId: "",
			vehicleId: "",
			routeId: "",
			date: new Date(),
			modality: undefined,
			type: undefined,
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			// await registerFreight({ ...registerData });
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
				<fieldset className="grid grid-cols-4 gap-4">
					<FormField
						control={form.control}
						name="deliveriesQuantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantidade de entregas</FormLabel>
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
								<FormLabel>Peso total de entregas</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="deliveriesQuantity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Quantidade de coletas (Opcional)
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
								<FormLabel>
									Peso total de coletas (Opcional)
								</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="driverId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Motorista</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o motorista" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="MICRO">
											Microempresa (Faturamento anual de
											até R$ 360mil)
										</SelectItem>
										<SelectItem value="SMALL">
											Pequena empresa (Faturamento anual
											de até R$ 4.8 milhões)
										</SelectItem>
										<SelectItem value="MEDIUM">
											Média empresa (Faturamento anual de
											até R$ 300 milhões)
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
						name="vehicleId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Veículo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o veículo" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="MICRO">
											Microempresa (Faturamento anual de
											até R$ 360mil)
										</SelectItem>
										<SelectItem value="SMALL">
											Pequena empresa (Faturamento anual
											de até R$ 4.8 milhões)
										</SelectItem>
										<SelectItem value="MEDIUM">
											Média empresa (Faturamento anual de
											até R$ 300 milhões)
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
				</fieldset>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Data do frete</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button variant="outline">
											{field.value ? (
												format(
													field.value,
													"dd/MM/yyyy",
													{ locale: ptBR }
												)
											) : (
												<span>Selecione uma data</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

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
										<SelectValue placeholder="Selecione o tipo deste frete" />
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

				<FormField
					control={form.control}
					name="modality"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Modalidade</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione a modalidade de pagamento deste frete" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
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
					name="routeId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rota</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione a rota deste frete" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
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

				<fieldset className="flex gap-4 justify-end">
					<Button
						type="button"
						className="mt-6 gap-2 border-rose-200 text-rose-400 hover:text-rose-500 hover:bg-rose-50"
						variant="outline"
						asChild
					>
						<Link href="/fretes">Cancelar</Link>
					</Button>
					<Button
						disabled={false}
						type="submit"
						className="w-full max-w-[200px] mt-6 gap-2"
					>
						Cadastrar
						{/* {false ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Concluir cadastro"
					)} */}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}
