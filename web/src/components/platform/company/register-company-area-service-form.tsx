"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRegisterCompanyAddress } from "@/hooks/use-register-company-address";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { STATES_ARRAY } from "@/utils/mocks/states";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
	stateAcronym: z.string().optional().nullable(),
	attendsAllStates: z.boolean(),
});

export function RegisterCompanyAreaServiceForm() {
	const router = useRouter();

	const { registerCompanyAddress, isPendingRegisterCompanyAddress } =
		useRegisterCompanyAddress();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			stateAcronym: "",
			attendsAllStates: false,
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
				<FormField
					control={form.control}
					name="attendsAllStates"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>
									Atendo todos os estados do Brasil
								</FormLabel>
								<FormDescription>
									Marcando esta opção, os demais campos abaixo
									não precisarão ser preenchidos.
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<Separator className="w-full my-6" />

				<FormField
					control={form.control}
					name="stateAcronym"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estado(s) de atendimento</FormLabel>
							<Select
								disabled={form.getValues("attendsAllStates")}
								onValueChange={field.onChange}
							>
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
				<Button
					disabled={
						isPendingRegisterCompanyAddress ||
						!form.getValues("attendsAllStates")
					}
					type="submit"
					className="w-full mt-6 gap-2"
				>
					{isPendingRegisterCompanyAddress ? (
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
