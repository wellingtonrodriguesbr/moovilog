import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface DeleteVehicleProps {
	vehicleId: string;
}

export function useDeleteVehicle() {
	const queryClient = useQueryClient();
	const { company } = useCompanyStore();
	const { mutateAsync: deleteVehicle, isPending: isDeleteVehiclePending } =
		useMutation({
			mutationFn: handleDeleteVehicle,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["vehicles"] });
			},
		});

	async function handleDeleteVehicle({ vehicleId }: DeleteVehicleProps) {
		await api.patch(`/${company.id}/vehicles/${vehicleId}`);
	}

	return {
		deleteVehicle,
		isDeleteVehiclePending,
	};
}
