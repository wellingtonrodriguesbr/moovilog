import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "./use-get-company-information";

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
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();

	const { data, isPending: isFetchAreasStatesFromCompanyPending } = useQuery({
		queryKey: ["states-from-company"],
		queryFn: handleFetchAreasStatesFromCompany,
	});

	async function handleFetchAreasStatesFromCompany() {
		if (company && !isGetCompanyInformationPending) {
			const { data } = await api.get<CompanyStates>(
				`/companies/${company.id}/areas-states`
			);

			return data;
		}
	}

	return {
		states: data?.states || [],
		areas: data?.areas || [],
		isFetchAreasStatesFromCompanyPending:
			isFetchAreasStatesFromCompanyPending ||
			isGetCompanyInformationPending,
	};
}
