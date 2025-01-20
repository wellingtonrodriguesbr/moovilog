import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "react-use";

export interface UseFetchAreasByStatesProps {
	stateAcronyms: string[];
}

export interface Area {
	id: string;
	name: string;
	code: number;
	stateId: string;
}

export function useFetchAreasByStates({
	stateAcronyms,
}: UseFetchAreasByStatesProps) {
	const [debouncedStates, setDebouncedStates] = useState<string[]>([]);
	const [isReady] = useDebounce(
		() => {
			setDebouncedStates(stateAcronyms);
		},
		2000,
		[stateAcronyms]
	);

	const { data: areas, isPending: isFetchAreasByStatesPending } = useQuery({
		queryKey: ["areas-by-states", debouncedStates],
		queryFn: handleFetchAreasByStates,
		enabled: !!isReady() && !!debouncedStates && debouncedStates.length > 0,
	});

	async function handleFetchAreasByStates() {
		const queryString = stateAcronyms.join(",");

		const { data } = await api.get<{ areas: Area[] }>(
			`/areas?states=${queryString}`
		);

		return data.areas;
	}

	return {
		areas: areas || [],
		isFetchAreasByStatesPending,
	};
}
