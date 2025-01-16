"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { STATES_ARRAY } from "@/utils/mocks/states";
import { MultiSelectStates } from "@/components/multi-select-states";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useFetchAreasByStates } from "@/hooks/use-fetch-areas-by-states";
import { MultiSelectAreas } from "@/components/multi-select-areas";

export function RegisterCompanyAreaServiceForm() {
	const router = useRouter();
	const form = useForm();

	const [selectedStates, setSelectedStates] = useState<string[]>([]);
	const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

	const { areas, isFetchAreasByStatesPending } = useFetchAreasByStates({
		states: selectedStates,
	});

	async function onSubmit(registerData: unknown) {
		try {
			toast.success("Cadastro concluído com sucesso");
			router.push("/inicio");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (
					error.response?.status === 404 &&
					error.response.data.message === "City not found"
				) {
					toast.error("Cidade não encontrada, fale com o suporte.");
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
						onNameChange={setSelectedStates}
						defaultValue={selectedStates}
						maxCount={3}
					/>
				</fieldset>

				<fieldset className="space-y-2">
					<Label>Selecione as regiões de atendimento</Label>
					<MultiSelectAreas
						options={areas}
						onAreaChange={setSelectedAreas}
						defaultValue={selectedAreas}
						disabled={
							selectedStates.length === 0 ||
							!areas.length ||
							isFetchAreasByStatesPending
						}
						maxCount={3}
					/>
				</fieldset>

				<Button
					disabled={
						isFetchAreasByStatesPending ||
						selectedStates.length === 0 ||
						selectedAreas.length === 0
					}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isFetchAreasByStatesPending ? (
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
