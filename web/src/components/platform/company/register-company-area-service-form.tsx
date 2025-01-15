"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
	stateAcronym: z.string().optional().nullable(),
});

export function RegisterCompanyAreaServiceForm() {
	const router = useRouter();
	const [selectedStates, setSelectedStates] = useState<string[]>([]);

	console.log(selectedStates);

	const { areas, isFetchAreasByStatesPending } = useFetchAreasByStates({
		states: selectedStates,
	});

	console.log(areas);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			stateAcronym: "",
		},
	});

	async function onSubmit(registerData: z.infer<typeof formSchema>) {
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
						options={STATES_ARRAY}
						onNameChange={setSelectedStates}
						defaultValue={selectedStates}
						maxCount={3}
					/>
				</fieldset>

				<Button
					disabled={
						isFetchAreasByStatesPending ||
						selectedStates.length === 0
					}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{false ? (
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
