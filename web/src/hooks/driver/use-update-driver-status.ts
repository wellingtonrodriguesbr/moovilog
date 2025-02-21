import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface UpdateDriverStatusProps {
	driverId: string;
	status: "ACTIVE" | "INACTIVE";
}

export function useUpdateDriverStatus() {
	const queryClient = useQueryClient();
	const { company } = useCompanyStore();
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
		await api.patch(`/${company.id}/drivers/${driverId}`, {
			status,
		});
	}

	return {
		updateDriverStatus,
		isUpdateDriverStatusPending,
	};
}
