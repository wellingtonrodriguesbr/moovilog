import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Route } from "@/interfaces";

interface RegisterNewRouteData {
	name: string;
	citiesIds: string[];
}

interface RegisterNewRouteResponse {
	route: Route;
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
			queryClient.invalidateQueries({ queryKey: ["cities-from-route"] });
		},
	});

	async function handleRegisterNewRoute(registerData: RegisterNewRouteData) {
		const { data } = await api.post<RegisterNewRouteResponse>("/routes", {
			...registerData,
		});

		return data.route;
	}

	return {
		registerNewRoute,
		isPendingRegisterNewRoute,
	};
}
