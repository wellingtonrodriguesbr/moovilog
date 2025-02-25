import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateDriverData {
	name?: string;
	documentNumber?: string;
	phone?: string;
	type?: "INTERNAL" | "FREELANCER" | "AGGREGATE";
	driverId: string;
}

export function useUpdateDriver() {
	const queryClient = useQueryClient();
	const { mutateAsync: updateDriver, isPending: isPendingUpdateDriver } =
		useMutation({
			mutationFn: handleUpdateDriver,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["drivers"] });
			},
		});

	async function handleUpdateDriver(updateData: UpdateDriverData) {
		const { data } = await api.put<{ driverId: string }>(
			`/drivers/${updateData.driverId}`,
			{
				...updateData,
			}
		);
		return data;
	}

	return { updateDriver, isPendingUpdateDriver };
}
