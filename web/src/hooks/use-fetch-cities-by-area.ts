import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface UseFetchCitiesByAreaProps {
	areaCode: number;
}

export interface City {
	id: string;
	name: string;
	stateId: string;
	areaId: string;
}

export function useFetchCitiesByArea({ areaCode }: UseFetchCitiesByAreaProps) {
	const { data: cities, isPending: isFetchCitiesByAreaPending } = useQuery({
		queryKey: ["cities"],
		queryFn: handleFetchCitiesByArea,
		enabled: !!areaCode,
	});

	async function handleFetchCitiesByArea() {
		const { data } = await api.get<{ cities: City[] }>(
			`/${areaCode}/cities`
		);

		return data.cities;
	}

	return {
		cities: cities || [],
		isFetchCitiesByAreaPending,
	};
}
