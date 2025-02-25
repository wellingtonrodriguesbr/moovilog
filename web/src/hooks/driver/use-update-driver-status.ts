import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateDriverStatusProps {
	driverId: string;
	status: "ACTIVE" | "INACTIVE";
}

export function useUpdateDriverStatus() {
	const queryClient = useQueryClient();
	const {
		mutateAsync: updateDriverStatus,
		isPending: isUpdateDriverStatusPending,
	} = useMutation({
		mutationFn: handleUpdateDriverStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["drivers"] });
		},
	});

	async function handleUpdateDriverStatus({
		driverId,
		status,
	}: UpdateDriverStatusProps) {
		await api.patch(`/drivers/${driverId}/status`, {
			status,
		});
	}

	return {
		updateDriverStatus,
		isUpdateDriverStatusPending,
	};
}
