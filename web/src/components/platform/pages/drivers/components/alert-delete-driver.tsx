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
import { useDeleteDriver } from "@/hooks/driver/use-delete-driver";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AlertDeleteDriverProps {
	driverId: string;
}

export function AlertDeleteDriver({ driverId }: AlertDeleteDriverProps) {
	const { deleteDriver, isDeleteDriverPending } = useDeleteDriver();

	async function handleDeleteDriver() {
		try {
			await deleteDriver({
				driverId,
			});
			toast.success("Motorista deletado com sucesso");
		} catch (error) {
			toast.error("Erro ao deletar motorista");
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className="flex items-center gap-2 px-2 py-1 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-sm transition-colors">
					<Trash2 className="size-4" />
					Deletar Motorista
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-md max-w-[350px]">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que deseja deletar este motorista?
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
						disabled={isDeleteDriverPending}
						onClick={handleDeleteDriver}
					>
						{isDeleteDriverPending ? (
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
