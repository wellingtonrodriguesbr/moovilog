import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "react-use";

export interface UseFetchAreasByStatesProps {
	states: string[];
}

export interface Area {
	id: string;
	name: string;
	code: number;
	stateId: string;
}

export interface FetchAreasByStatesResponse {
	areas: Area[];
}

export function useFetchAreasByStates({ states }: UseFetchAreasByStatesProps) {
	const [debouncedStates, setDebouncedStates] = useState<string[]>([]);
	const [isReady] = useDebounce(
		() => {
			setDebouncedStates(states);
		},
		2000,
		[states]
	);

	const { data: areas, isPending: isFetchAreasByStatesPending } = useQuery({
		queryKey: ["areas-by-states", debouncedStates],
		queryFn: handleFetchAreasByStates,
		enabled: !!isReady() && !!debouncedStates && debouncedStates.length > 0,
	});

	async function handleFetchAreasByStates() {
		const queryString = states.join(",");

		const { data } = await api.get<{ areas: FetchAreasByStatesResponse[] }>(
			`/areas?states=${queryString}`
		);

		return data.areas;
	}

	return {
		areas,
		isFetchAreasByStatesPending,
	};
}
