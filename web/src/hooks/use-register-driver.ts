import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterDriverData {
	name: string;
	documentNumber: string;
	phone: string;
	type: "INTERNAL" | "FREELANCER" | "AGGREGATE";
}

export function useRegisterDriver() {
	const queryClient = useQueryClient();
	const { mutateAsync: registerDriver, isPending: isPendingRegisterDriver } =
		useMutation({
			mutationFn: handleRegisterDriver,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["drivers"] });
			},
		});

	async function handleRegisterDriver(registerData: RegisterDriverData) {
		const { data } = await api.post<{ driverId: string }>("/drivers", {
			...registerData,
		});
		return data;
	}

	return { registerDriver, isPendingRegisterDriver };
}
