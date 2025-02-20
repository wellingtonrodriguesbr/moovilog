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
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import { formatPlate } from "@/utils/format-plate";
import { useRegisterVehicle } from "@/hooks/vehicle/use-register-vehicle";
import { formatWeight } from "@/utils/format-weight";
import { AxiosError } from "axios";
import { TRUCK_BRANDS } from "@/utils/mocks/truck-brands";

interface RegisterDriverFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	plate: z.string({ message: "Digite a placa do veículo" }),
	trailerPlate: z
		.string({ message: "Digite a placa do reboque" })
		.optional()
		.nullable(),
	year: z
		.string()
		.trim()
		.regex(/^\d{1,4}$/, { message: "Digite até 4 números" })
		.transform((value) => Number(value))
		.refine((value) => value >= 1900 && value <= new Date().getFullYear(), {
			message: "O ano deve estar entre 1900 e o atual",
		}),
	category: z.enum(
		[
			"UTILITY",
			"VAN",
			"LIGHT_TRUCKS",
			"STRAIGHT_TRUCKS",
			"TRUCKS",
			"QUAD_AXLE_TRUCKS",
			"SEMI_TRAILER",
			"B_TRAIN",
			"ROAD_TRAIN",
		],
		{
			message: "Selecione a categoria do veículo",
		}
	),
	type: z.enum(["OWN", "OUTSOURCED", "RENTED"], {
		message: "Selecione o tipo do veículo",
	}),
	body: z.enum(
		[
			"CLOSED",
			"OPEN",
			"SIDER",
			"REFRIGERATED",
			"BUCKET",
			"TANK",
			"BULK_CARRIER",
			"LIVESTOCK",
			"FLATBED",
			"CONTAINER",
			"WOOD",
			"CAR_CARRIER",
		],
		{
			message: "Selecione a carroceria do veículo",
		}
	),
	fullLoadCapacity: z
		.string()
		.transform((value) => value.replace(/\D/g, ""))
		.transform((value) => Number(value)),
	brand: z.string(),
	model: z.string(),
});

const typesThatRequireTrailerPlate = ["SEMI_TRAILER", "B_TRAIN", "ROAD_TRAIN"];

export function RegisterVehicleForm({
	onCloseDialog,
}: RegisterDriverFormProps) {
	const { registerVehicle, isPendingRegisterVehicle } = useRegisterVehicle();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			plate: "",
			trailerPlate: "",
			year: undefined,
			fullLoadCapacity: undefined,
			brand: "",
			type: undefined,
			body: undefined,
			category: undefined,
		},
	});

	const shouldIncludeTrailerPlate = typesThatRequireTrailerPlate.includes(
		form.watch("category")
	);

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
				onSubmit={(e) => {
					e.stopPropagation();
					form.handleSubmit(onSubmit)(e);
				}}
				className="flex flex-col gap-4 w-full"
			>
				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="brand"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Marca</FormLabel>
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
										{TRUCK_BRANDS.map((brand) => (
											<SelectItem
												key={brand}
												value={brand}
											>
												{brand}
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
				</fieldset>

				<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
									<SelectContent side="right">
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
				</fieldset>

				<fieldset
					data-shouldIncludeTrailerPlate={shouldIncludeTrailerPlate}
					className="grid grid-cols-1 md:grid-cols-3 md:data-[shouldIncludeTrailerPlate=true]:grid-cols-4 gap-4"
				>
					<FormField
						control={form.control}
						name="plate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{shouldIncludeTrailerPlate
										? "Placa do cavalo"
										: "Placa"}
								</FormLabel>
								<FormControl>
									<Input
										placeholder="ABC-0000"
										autoComplete="off"
										maxLength={8}
										{...field}
										value={formatPlate(field.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{shouldIncludeTrailerPlate ? (
						<FormField
							control={form.control}
							name="trailerPlate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Placa do reboque</FormLabel>
									<FormControl>
										<Input
											placeholder="ABC-0000"
											autoComplete="off"
											maxLength={8}
											{...field}
											value={formatPlate(
												field.value ?? ""
											)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : null}

					<FormField
						control={form.control}
						name="year"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ano de fabricação</FormLabel>
								<FormControl>
									<Input
										type="text"
										maxLength={4}
										inputMode="numeric"
										pattern="[0-9]*"
										autoComplete="off"
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
						name="fullLoadCapacity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Capacidade de carga</FormLabel>
								<FormControl>
									<Input
										type="text"
										inputMode="numeric"
										placeholder="Ex: 4.000kg"
										{...field}
										value={formatWeight(field.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<fieldset className="flex justify-end gap-2 mt-6">
					<Button
						disabled={isPendingRegisterVehicle}
						onClick={onCloseDialog}
						type="button"
						variant="destructive-outline"
					>
						Cancelar
					</Button>
					<Button disabled={isPendingRegisterVehicle} type="submit">
						{isPendingRegisterVehicle ? (
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

const VEHICLE_TYPES = [
	{
		label: "Próprio",
		value: "OWN",
	},
	{
		label: "Agregado",
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
	{
		label: "Tanque",
		value: "TANK",
	},
	{
		label: "Graneleiro",
		value: "BULK_CARRIER",
	},
	{
		label: "Gaiola (Transporte de Animais)",
		value: "LIVESTOCK",
	},
	{
		label: "Plataforma",
		value: "FLATBED",
	},
	{
		label: "Porta-Contêiner",
		value: "CONTAINER",
	},
	{
		label: "Transporte de Madeira",
		value: "WOOD",
	},
	{
		label: "Cegonha",
		value: "CAR_CARRIER",
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
		label: "Bitrem",
		value: "B_TRAIN",
	},
	{
		label: "Rodotrem",
		value: "ROAD_TRAIN",
	},
];
