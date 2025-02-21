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
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import { useUpdateVehicleStatus } from "@/hooks/vehicle/use-update-vehicle-status";
import { Vehicle } from "@/interfaces";

interface UpdateVehicleStatusFormProps {
	onCloseDialog: () => void;
	vehicleId: string;
	currentStatus: Vehicle["status"];
}

const formSchema = z.object({
	status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "RESERVED", "BROKEN"]),
});

export function UpdateVehicleStatusForm({
	onCloseDialog,
	vehicleId,
	currentStatus,
}: UpdateVehicleStatusFormProps) {
	const { updateVehicleStatus, isUpdateVehicleStatusPending } =
		useUpdateVehicleStatus();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			status: currentStatus ?? undefined,
		},
	});

	async function onSubmit({ status }: z.infer<typeof formSchema>) {
		try {
			await updateVehicleStatus({ status, vehicleId });
			onCloseDialog();
			toast.success("Status atualizado com sucesso");
		} catch (error) {
			toast.error("Erro ao atualizar status do veículo, tente novamente");
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
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
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
									{VEHICLE_STATUS.map((status) => (
										<SelectItem
											key={status.key}
											value={status.key}
											disabled={
												status.key === currentStatus
											}
										>
											{status.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<fieldset className="flex justify-end gap-2 mt-6">
					<Button
						disabled={isUpdateVehicleStatusPending}
						onClick={onCloseDialog}
						type="button"
						variant="destructive-outline"
					>
						Cancelar
					</Button>
					<Button
						disabled={isUpdateVehicleStatusPending}
						type="submit"
					>
						{isUpdateVehicleStatusPending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Salvar"
						)}
					</Button>
				</fieldset>
			</form>
		</Form>
	);
}

const VEHICLE_STATUS = [
	{ key: "ACTIVE", label: "Ativo" },
	{ key: "INACTIVE", label: "Inativo" },
	{ key: "MAINTENANCE", label: "Em Manutenção" },
	{ key: "RESERVED", label: "Reservado" },
	{ key: "BROKEN", label: "Com defeito" },
];
