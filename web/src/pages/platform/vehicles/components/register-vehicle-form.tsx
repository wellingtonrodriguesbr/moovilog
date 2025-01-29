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
import { useRegisterDriver } from "@/hooks/use-register-driver";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import { formatPlate } from "@/utils/format-plate";
import { useRegisterVehicle } from "@/hooks/use-register-vehicle";
import { formatWeight } from "@/utils/format-weight";
import { AxiosError } from "axios";

interface RegisterDriverFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	plate: z.string(),
	year: z
		.string()
		.transform((value) => value.replace(/\D/g, ""))
		.transform((value) => value.slice(0, 4))
		.transform((value) => Number(value)),
	category: z.enum([
		"UTILITY",
		"VAN",
		"LIGHT_TRUCKS",
		"STRAIGHT_TRUCKS",
		"TRUCKS",
		"QUAD_AXLE_TRUCKS",
		"SEMI_TRAILER",
		"TANDEM_AXLE_TRUCK",
	]),
	type: z.enum(["OWN", "OUTSOURCED", "RENTED"]),
	body: z.enum(["CLOSED", "OPEN", "SIDER", "REFRIGERATED", "BUCKET"]),
	fullLoadCapacity: z
		.string()
		.transform((value) => value.replace(/\D/g, ""))
		.transform((value) => Number(value)),
	brand: z.string(),
	model: z.string(),
});

export function RegisterVehicleForm({
	onCloseDialog,
}: RegisterDriverFormProps) {
	const { registerVehicle, isPendingRegisterVehicle } = useRegisterVehicle();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			plate: "",
			year: undefined,
			fullLoadCapacity: undefined,
			brand: "",
			type: undefined,
			body: undefined,
			category: undefined,
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			await registerVehicle({ ...registerData });
			onCloseDialog();
			toast.success("Veículo cadastrado com sucesso");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					toast.error("Já existe um veículo com esta placa");
				}
			} else {
				toast.error("Erro ao cadastrar veículo");
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
					name="plate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placa</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0 uppercase"
										placeholder="XXX-XXXX"
										autoComplete="off"
										maxLength={8}
										{...field}
										value={formatPlate(field.value)}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ano de fabricação</FormLabel>
							<FormControl>
								<Input
									maxLength={4}
									placeholder="Ex: 1996"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="brand"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Marca</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: Mercedes-Benz"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="model"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Modelo</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: ATEGO 1419"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="fullLoadCapacity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capacidade máxima de peso</FormLabel>
							<FormControl>
								<Input
									placeholder="Ex: 4.000kg"
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
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoria</FormLabel>
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
									{VEHICLE_CATEGORIES.map((category) => (
										<SelectItem
											key={category.label}
											value={category.value}
										>
											{category.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de veículo</FormLabel>
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
									{VEHICLE_TYPES.map((type) => (
										<SelectItem
											key={type.label}
											value={type.value}
										>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de carroceria</FormLabel>
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
									{VEHICLE_BODIES.map((body) => (
										<SelectItem
											key={body.label}
											value={body.value}
										>
											{body.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isPendingRegisterVehicle}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isPendingRegisterVehicle ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Concluir cadastro"
					)}
				</Button>
			</form>
		</Form>
	);
}

const VEHICLE_TYPES = [
	{
		label: "Próprio",
		value: "OWN",
	},
	{
		label: "Terceirizado",
		value: "OUTSOURCED",
	},
	{
		label: "Alugado",
		value: "RENTED",
	},
];

const VEHICLE_BODIES = [
	{
		label: "Fechado",
		value: "CLOSED",
	},
	{
		label: "Aberto",
		value: "OPEN",
	},
	{
		label: "Sider",
		value: "SIDER",
	},
	{
		label: "Refrigerado",
		value: "REFRIGERATED",
	},
	{
		label: "Caçamba",
		value: "BUCKET",
	},
];

const VEHICLE_CATEGORIES = [
	{
		label: "Utilitário / Fiorino",
		value: "UTILITY",
	},
	{
		label: "Van",
		value: "VAN",
	},
	{
		label: "3/4",
		value: "LIGHT_TRUCKS",
	},
	{
		label: "Toco",
		value: "STRAIGHT_TRUCKS",
	},
	{
		label: "Truck",
		value: "TRUCKS",
	},
	{
		label: "Quarto eixo",
		value: "QUAD_AXLE_TRUCKS",
	},
	{
		label: "Carreta",
		value: "SEMI_TRAILER",
	},
	{
		label: "Caçamba",
		value: "TANDEM_AXLE_TRUCK",
	},
];
