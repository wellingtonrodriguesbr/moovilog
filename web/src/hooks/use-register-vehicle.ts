import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterVehicleData {
	plate: string;
	year: number;
	category:
		| "UTILITY"
		| "VAN"
		| "LIGHT_TRUCKS"
		| "STRAIGHT_TRUCKS"
		| "TRUCKS"
		| "QUAD_AXLE_TRUCKS"
		| "SEMI_TRAILER"
		| "TANDEM_AXLE_TRUCK";
	type: "OWN" | "OUTSOURCED" | "RENTED";
	body: "CLOSED" | "OPEN" | "SIDER" | "REFRIGERATED" | "BUCKET";
	fullLoadCapacity: number;
	brand: string;
	model: string;
}

export interface Vehicle {
	id: string;
	plate: string;
	year: number;
	brand: string;
	model: string;
	category: string;
	type: string;
	body: string;
	fullLoadCapacity: number;
	createdAt: string;
	updatedAt: string;
	companyId: string;
	creatorId: string;
}

export function useRegisterVehicle() {
	const queryClient = useQueryClient();
	const {
		mutateAsync: registerVehicle,
		isPending: isPendingRegisterVehicle,
	} = useMutation({
		mutationFn: handleRegisterVehicle,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vehicles"] });
		},
	});

	async function handleRegisterVehicle(registerData: RegisterVehicleData) {
		const { data } = await api.post<{ vehicle: Vehicle }>("/vehicles", {
			...registerData,
		});
		return data;
	}

	return { registerVehicle, isPendingRegisterVehicle };
}
