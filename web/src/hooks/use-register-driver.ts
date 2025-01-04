import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterDriverData {
	name: string;
	documentNumber: string;
	phone: string;
	type: "INTERNAL" | "FREELANCER" | "AGGREGATE";
}

export function useRegisterDriver() {
	const { mutateAsync: registerDriver, isPending: isPendingRegisterDriver } =
		useMutation({
			mutationFn: handleRegisterDriver,
		});

	async function handleRegisterDriver(registerData: RegisterDriverData) {
		const { data } = await api.post<{ driverId: string }>("/drivers", {
			...registerData,
		});
		return data;
	}

	return { registerDriver, isPendingRegisterDriver };
}
