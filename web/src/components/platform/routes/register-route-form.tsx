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
import { useFetchStatesFromCompany } from "@/hooks/use-fetch-states-from-company";
import { useFetchAreasByStates } from "@/hooks/use-fetch-areas-by-states";

interface RegisterRouteFormProps {
	onCloseDialog: () => void;
}

const formSchema = z.object({
	name: z.string().min(3, { message: "Dê um nome para rota" }),
	stateAcronym: z
		.string()
		.min(1, { message: "Selecione um estado" })
		.transform((value) => value.toLowerCase()),
	areaId: z.string().min(1, { message: "Selecione pelo menos uma cidade" }),
});

export function RegisterRouteForm({ onCloseDialog }: RegisterRouteFormProps) {
	const { states, isFetchStatesFromCompanyPending } =
		useFetchStatesFromCompany();
	const { areas, isFetchAreasByStatesPending } = useFetchAreasByStates({
		stateAcronyms: states.map((state) => state.acronym),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			stateAcronym: "",
			areaId: "",
		},
	});

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
								disabled={isFetchStatesFromCompanyPending}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={
												isFetchStatesFromCompanyPending
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
					name="areaId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Região de atendimento</FormLabel>
							<Select
								disabled={
									form.getValues("stateAcronym") === "" ||
									isFetchAreasByStatesPending ||
									isFetchStatesFromCompanyPending
								}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma região" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{areas.map((area) => (
										<SelectItem
											key={area.id}
											value={area.id}
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

				{/* <FormField
					control={form.control}
					name="citiesIds"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cidades</FormLabel>
							<Select
								disabled={form.getValues("stateAcronym") === ""}
								onValueChange={field.onChange}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione as cidades" />
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
				/> */}

				<Button
					disabled={false}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isFetchAreasByStatesPending ||
					isFetchStatesFromCompanyPending ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Concluir cadastro"
					)}
				</Button>
			</form>
		</Form>
	);
}
