import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Freight } from "@/interfaces/freight";

interface RegisterFreightData {
	observation?: string | null;
	pickupsQuantity?: string | null;
	deliveriesQuantity: number;
	totalWeightOfPickups?: number | null;
	totalWeightOfDeliveries: number;
	freightAmountInCents: number;
	driverId: string;
	vehicleId: string;
	routeId: string;
	date: Date;
	paymentDate: Date;
	modality:
		| "DAILY"
		| "PERCENTAGE"
		| "PRODUCTIVITY"
		| "FLAT_RATE"
		| "WEIGHT_BASED"
		| "DISTANCE_BASED"
		| "TIME_BASED"
		| "PER_STOP"
		| "ZONE_BASED";
	type: "FRACTIONAL" | "DEDICATED" | "EXPRESS" | "TRANSFER";
}

interface RegisterFreightResponse {
	freight: Freight;
}

export function useRegisterFreight() {
	const queryClient = useQueryClient();
	const {
		mutateAsync: registerFreight,
		isPending: isPendingRegisterFreight,
	} = useMutation({
		mutationFn: handleRegisterFreight,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["freights"] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});

	async function handleRegisterFreight(registerData: RegisterFreightData) {
		const { data } = await api.post<RegisterFreightResponse>("/freights", {
			...registerData,
		});
		return data;
	}

	return { registerFreight, isPendingRegisterFreight };
}
