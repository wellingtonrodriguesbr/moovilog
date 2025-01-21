import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterNewRouteData {
	name: string;
	citiesIds: string[];
}

export interface Route {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	creatorId: string;
	companyId: string;
}

export function useRegisterNewRoute() {
	const queryClient = useQueryClient();

	const {
		mutateAsync: registerNewRoute,
		isPending: isPendingRegisterNewRoute,
	} = useMutation({
		mutationFn: handleRegisterNewRoute,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["routes"] });
			queryClient.invalidateQueries({ queryKey: ["cities-in-route"] });
		},
	});

	async function handleRegisterNewRoute(registerData: RegisterNewRouteData) {
		const { data } = await api.post<{ route: Route }>("/routes", {
			...registerData,
		});

		return data.route;
	}

	return {
		registerNewRoute,
		isPendingRegisterNewRoute,
	};
}
