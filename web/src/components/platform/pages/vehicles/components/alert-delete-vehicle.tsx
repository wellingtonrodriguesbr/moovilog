import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteVehicle } from "@/hooks/vehicle/use-delete-vehicle";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AlertDeleteVehicleProps {
	vehicleId: string;
}

export function AlertDeleteVehicle({ vehicleId }: AlertDeleteVehicleProps) {
	const { deleteVehicle, isDeleteVehiclePending } = useDeleteVehicle();

	async function handleDeleteVehicle() {
		try {
			await deleteVehicle({
				vehicleId,
			});
			toast.success("Veículo deletado com sucesso");
		} catch (error) {
			toast.error("Erro ao deletar veículo");
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className="flex items-center gap-2 px-2 py-1 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-sm transition-colors">
					<Trash2 className="size-4" />
					Deletar veículo
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que deseja deletar este veículo?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Todos os dados, como: fretes, transações, coletas e
						entregas, serão deletados. Essa ação não pode ser
						desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="border-rose-200 text-rose-500 hover:text-rose-600">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isDeleteVehiclePending}
						onClick={handleDeleteVehicle}
					>
						{isDeleteVehiclePending ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Deletar mesmo assim"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
