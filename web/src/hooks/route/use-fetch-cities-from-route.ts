import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { City } from "@/interfaces";

interface FetchCitiesFromRouteResponse {
	cities: City[];
}

interface UseFetchCitiesFromRouteProps {
	routeId: string;
}

export function useFetchCitiesFromRoute({
	routeId,
}: UseFetchCitiesFromRouteProps) {
	const { data: cities, isPending: isFetchCitiesFromRoutePending } = useQuery(
		{
			queryKey: ["cities-from-route", routeId],
			queryFn: handleFetchCitiesFromRoute,
			enabled: !!routeId,
		}
	);

	async function handleFetchCitiesFromRoute() {
		const { data } = await api.get<FetchCitiesFromRouteResponse>(
			`/routes/${routeId}/cities`
		);

		return data.cities;
	}

	return {
		cities,
		isFetchCitiesFromRoutePending,
	};
}
