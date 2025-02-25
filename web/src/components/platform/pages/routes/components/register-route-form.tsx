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
import { Label } from "@/components/ui/label";
import { MultiSelectCities } from "@/components/platform/multi-select-cities";
import { useRegisterNewRoute } from "@/hooks/route/use-register-new-route";

import { Loader2 } from "lucide-react";
import { STATES_ARRAY } from "@/utils/mocks/states";
import {
	FetchCitiesFromStateResponse,
	useFetchCitiesFromState,
} from "@/hooks/use-fetch-cities-from-state";

interface RegisterRouteFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	name: z.string().min(3, { message: "Dê um nome para rota" }),
	stateAcronym: z
		.string()
		.min(1, { message: "Selecione um estado" })
		.transform((value) => value.toLowerCase()),
	cityNames: z.array(z.string()),
});

export function RegisterRouteForm({ onCloseDialog }: RegisterRouteFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			stateAcronym: "",
			cityNames: [],
		},
	});

	const { cities, isFetchCitiesFromStatePending } = useFetchCitiesFromState({
		stateAcronym: form.watch("stateAcronym"),
	});

	const { registerNewRoute, isPendingRegisterNewRoute } =
		useRegisterNewRoute();

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			await registerNewRoute({ ...registerData });
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
				onSubmit={(e) => {
					e.stopPropagation();
					form.handleSubmit(onSubmit)(e);
				}}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome da rota</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									autoComplete="off"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="stateAcronym"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estado</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione um estado" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{STATES_ARRAY.map((state) => (
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
						</FormItem>
					)}
				/>

				<fieldset className="space-y-2">
					<Label>Selecione as cidades</Label>
					<MultiSelectCities
						modalPopover
						options={cities ?? []}
						onCitiesChange={(selectedCities) => {
							form.setValue("cityNames", selectedCities);
						}}
						disabled={
							!form.watch("stateAcronym") ||
							isFetchCitiesFromStatePending
						}
						placeholder={
							form.watch("stateAcronym") &&
							isFetchCitiesFromStatePending
								? "Carregando cidades.."
								: "Clique para selecionar"
						}
						maxCount={3}
					/>
				</fieldset>

				<fieldset className="flex justify-end gap-2 mt-6">
					<Button
						onClick={onCloseDialog}
						type="button"
						variant="destructive-outline"
					>
						Cancelar
					</Button>
					<Button
						disabled={
							!form.watch("cityNames").length ||
							isPendingRegisterNewRoute ||
							isFetchCitiesFromStatePending
						}
						type="submit"
					>
						{isPendingRegisterNewRoute ? (
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
