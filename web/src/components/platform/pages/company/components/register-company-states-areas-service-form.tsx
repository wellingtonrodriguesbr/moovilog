"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { STATES_ARRAY } from "@/utils/mocks/states";
import { MultiSelectStates } from "@/components/platform/multi-select-states";
import { Label } from "@/components/ui/label";
import { useFetchAreasByStates } from "@/hooks/use-fetch-areas-by-states";
import { MultiSelectAreas } from "@/components/platform/multi-select-areas";
import { useRegisterCompanyStatesAreasService } from "@/hooks/company/use-register-company-states-areas-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
	stateAcronyms: z.array(z.string()),
	areaIds: z.array(z.string()),
});

export function RegisterCompanyStatesAreasServiceForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			stateAcronyms: [],
			areaIds: [],
		},
	});

	const { areas, isFetchAreasByStatesPending } = useFetchAreasByStates({
		stateAcronyms: form.watch("stateAcronyms"),
	});
	const {
		registerCompanyStatesAreasService,
		isPendingRegisterCompanyStatesAreasService,
	} = useRegisterCompanyStatesAreasService();

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
		try {
			await registerCompanyStatesAreasService(registerData);
			toast.success("Cadastro concluído com sucesso");
			router.push("/inicio");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 404) {
					toast.error(
						"Estado ou área não encontrada, tente novamente."
					);
				} else {
					toast.error("Erro desconhecido, fale com o suporte.");
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<fieldset className="space-y-2">
					<Label>
						Selecione os estados atendidos pela sua empresa
					</Label>
					<MultiSelectStates
						options={STATES_ARRAY}
						onStatesChange={(selectedStates) =>
							form.setValue("stateAcronyms", selectedStates)
						}
						defaultValue={form.watch("stateAcronyms")}
						maxCount={3}
					/>
				</fieldset>

				<fieldset className="space-y-2">
					<Label>Selecione as regiões de atendimento</Label>
					<MultiSelectAreas
						options={areas}
						onAreasChange={(selectedAreas) =>
							form.setValue("areaIds", selectedAreas)
						}
						defaultValue={form.watch("areaIds")}
						disabled={
							form.watch("stateAcronyms").length === 0 ||
							!areas.length ||
							isFetchAreasByStatesPending
						}
						placeholder={
							isFetchAreasByStatesPending &&
							form.watch("stateAcronyms").length > 0
								? "Carregando regiões..."
								: "Clique para selecionar"
						}
						maxCount={3}
					/>
				</fieldset>

				<Button
					disabled={
						isFetchAreasByStatesPending ||
						isPendingRegisterCompanyStatesAreasService ||
						form.watch("stateAcronyms").length === 0 ||
						form.watch("areaIds").length === 0
					}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isPendingRegisterCompanyStatesAreasService ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						<>
							Concluir cadastro
							<ArrowRight className="size-4" />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
