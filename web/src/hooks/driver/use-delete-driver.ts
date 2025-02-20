import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface DeleteDriverProps {
	driverId: string;
}

export function useDeleteDriver() {
	const queryClient = useQueryClient();
	const { company } = useCompanyStore();
	const { mutateAsync: deleteDriver, isPending: isDeleteDriverPending } =
		useMutation({
			mutationFn: handleDeleteDriver,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["drivers"] });
			},
		});

	async function handleDeleteDriver({ driverId }: DeleteDriverProps) {
		await api.patch(`/${company.id}/drivers/${driverId}`);
	}

	return {
		deleteDriver,
		isDeleteDriverPending,
	};
}
