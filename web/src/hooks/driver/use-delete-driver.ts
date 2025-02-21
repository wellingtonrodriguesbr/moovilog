import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { Driver } from "@/interfaces";

interface DeleteDriverProps {
	driverId: string;
}

export function useDeleteDriver() {
	const queryClient = useQueryClient();
	const { company } = useCompanyStore();
	const { mutateAsync: deleteDriver, isPending: isDeleteDriverPending } =
		useMutation({
			mutationFn: handleDeleteDriver,
			onSuccess: (_, { driverId }) => {
				queryClient.setQueryData(["drivers"], (oldData: Driver[]) => {
					return oldData
						? oldData.filter(
								(driver: Driver) => driver.id !== driverId
							)
						: [];
				});

				queryClient.invalidateQueries({ queryKey: ["drivers"] });
			},
		});

	async function handleDeleteDriver({ driverId }: DeleteDriverProps) {
		await api.delete(`/${company.id}/drivers/${driverId}`);
	}

	return {
		deleteDriver,
		isDeleteDriverPending,
	};
}
