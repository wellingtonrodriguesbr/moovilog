import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface FetchCitiesFromStateResponse {
	id: number;
	nome: string;
}

interface UseFetchCitiesFromStateProps {
	stateAcronym: string;
}

export function useFetchCitiesFromState({
	stateAcronym,
}: UseFetchCitiesFromStateProps) {
	const { data: cities, isPending: isFetchCitiesFromStatePending } = useQuery(
		{
			queryKey: ["cities-from-state", stateAcronym],
			queryFn: handleFetchCitiesFromState,
			enabled: !!stateAcronym,
		}
	);

	async function handleFetchCitiesFromState() {
		try {
			const { data } = await axios.get<FetchCitiesFromStateResponse[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAcronym.toLocaleLowerCase()}/municipios`
			);

			return data;
		} catch (error) {
			console.log(error);
		}
	}

	return {
		cities: cities ?? [],
		isFetchCitiesFromStatePending,
	};
}
