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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import { useFetchAreasStatesFromCompany } from "@/hooks/use-fetch-areas-states-from-company";
import { useFetchCitiesByArea } from "@/hooks/use-fetch-cities-by-area";
import { Label } from "@/components/ui/label";
import { MultiSelectCities } from "@/components/multi-select-cities";

interface RegisterRouteFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	name: z.string().min(3, { message: "Dê um nome para rota" }),
	stateAcronym: z
		.string()
		.min(1, { message: "Selecione um estado" })
		.transform((value) => value.toLowerCase()),
	areaCode: z
		.string()
		.min(1, { message: "Selecione pelo menos uma cidade" })
		.transform((value) => Number(value)),
	citiesIds: z.array(z.string()),
});

export function RegisterRouteForm({ onCloseDialog }: RegisterRouteFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			stateAcronym: "",
			areaCode: undefined,
			citiesIds: [],
		},
	});

	const { states, areas, isFetchAreasStatesFromCompanyPending } =
		useFetchAreasStatesFromCompany();
	const { cities, isFetchCitiesByAreaPending } = useFetchCitiesByArea({
		areaCode: form.watch("areaCode"),
	});

	console.log(form.watch("citiesIds"));

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
					name="stateAcronym"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estado</FormLabel>
							<Select
								disabled={isFetchAreasStatesFromCompanyPending}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												isFetchAreasStatesFromCompanyPending
													? "Carregando..."
													: "Selecione um estado"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{states.map((state) => (
										<SelectItem
											value={state.acronym}
											key={state.acronym}
										>
											{state.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
							<FormDescription>
								Os estados listados aqui são com base na sua
								escolha no momento da criação de conta na etapa
								de cadastro de área atendida.
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="areaCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Região de atendimento</FormLabel>
							<Select
								disabled={isFetchAreasStatesFromCompanyPending}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												isFetchAreasStatesFromCompanyPending
													? "Carregando..."
													: "Selecione uma região"
											}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{areas.map((area) => (
										<SelectItem
											key={area.id}
											value={area.code.toString()}
										>
											DDD {area.code} - {area.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
							<FormDescription>
								As regiões listadas aqui são com base na sua
								escolha no momento da criação de conta na etapa
								de cadastro de área atendida.
							</FormDescription>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome da rota</FormLabel>
							<FormControl>
								<div className="flex items-center rounded-md overflow-hidden border pr-4">
									<Input
										className="border-0 rounded-none outline-none focus-visible:ring-0"
										placeholder=""
										autoComplete="off"
										disabled={
											form.getValues("stateAcronym") ===
											""
										}
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<fieldset className="space-y-2">
					<Label>Selecione as cidades</Label>
					<MultiSelectCities
						modalPopover
						options={cities}
						onCitiesChange={(selectedCities) =>
							form.setValue("citiesIds", selectedCities)
						}
						defaultValue={form.watch("citiesIds")}
						disabled={
							isFetchCitiesByAreaPending || cities.length === 0
						}
						placeholder={
							isFetchCitiesByAreaPending
								? "Carregando cidades..."
								: "Clique para selecionar"
						}
						maxCount={3}
					/>
				</fieldset>

				<Button
					disabled={false}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isFetchAreasStatesFromCompanyPending ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Concluir cadastro"
					)}
				</Button>
			</form>
		</Form>
	);
}
