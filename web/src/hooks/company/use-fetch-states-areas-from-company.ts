import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { Area, State } from "@/interfaces";

interface FetchStatesAreasFromCompanyResponse {
	states: State[];
	areas: Area[];
}

export function useFetchStatesAreasFromCompany() {
	const { company } = useCompanyStore();

	const { data, isPending: isFetchStatesAreasFromCompanyPending } = useQuery({
		queryKey: ["states-areas-from-company"],
		queryFn: handleFetchStatesAreasFromCompany,
		enabled: !!company,
	});

	async function handleFetchStatesAreasFromCompany() {
		const { data } = await api.get<FetchStatesAreasFromCompanyResponse>(
			`/companies/${company.id}/states-areas`
		);

		return data;
	}

	return {
		states: data?.states || [],
		areas: data?.areas || [],
		isFetchStatesAreasFromCompanyPending:
			isFetchStatesAreasFromCompanyPending,
	};
}
