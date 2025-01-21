import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface City {
	id: string;
	name: string;
	stateId: string;
	areaId: string;
}

interface UseFetchCitiesInRouteProps {
	routeId: string;
}

export function useFetchCitiesInRoute({ routeId }: UseFetchCitiesInRouteProps) {
	const { data: cities, isPending: isFetchCitiesInRoutePending } = useQuery({
		queryKey: ["cities-in-route", routeId],
		queryFn: handleFetchCitiesInRoute,
		enabled: !!routeId,
	});

	async function handleFetchCitiesInRoute() {
		const { data } = await api.get<{ cities: City[] }>(
			`/routes/${routeId}/cities`
		);

		return data.cities;
	}

	return {
		cities,
		isFetchCitiesInRoutePending,
	};
}
