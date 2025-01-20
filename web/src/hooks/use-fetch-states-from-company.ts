import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "./use-get-company-information";

export interface UseFetchStatesFromCompanyProps {
	stateAcronyms: string[];
}

export interface CompanyStates {
	states: {
		id: string;
		name: string;
		acronym: string;
	}[];
}

export function useFetchStatesFromCompany() {
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();

	const { data: states, isPending: isFetchStatesFromCompanyPending } =
		useQuery({
			queryKey: ["states-from-company"],
			queryFn: handleFetchStatesFromCompany,
		});

	async function handleFetchStatesFromCompany() {
		if (company && !isGetCompanyInformationPending) {
			const { data } = await api.get<CompanyStates>(
				`/companies/${company.id}/states`
			);

			return data.states;
		}
	}

	return {
		states: states || [],
		isFetchStatesFromCompanyPending:
			isFetchStatesFromCompanyPending || isGetCompanyInformationPending,
	};
}
