import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

export interface Area {
	id: string;
	name: string;
	code: number;
	stateId: string;
}

export interface State {
	id: string;
	name: string;
	acronym: string;
}

export interface CompanyStates {
	states: State[];
	areas: Area[];
}

export function useFetchAreasStatesFromCompany() {
	const { companyId } = useCompanyStore();

	const { data, isPending: isFetchAreasStatesFromCompanyPending } = useQuery({
		queryKey: ["states-areas-from-company"],
		queryFn: handleFetchAreasStatesFromCompany,
		enabled: !!companyId,
	});

	async function handleFetchAreasStatesFromCompany() {
		const { data } = await api.get<CompanyStates>(
			`/companies/${companyId}/states-areas`
		);

		return data;
	}

	return {
		states: data?.states || [],
		areas: data?.areas || [],
		isFetchAreasStatesFromCompanyPending:
			isFetchAreasStatesFromCompanyPending,
	};
}
