import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { Route } from "@/interfaces";

interface FetchRoutesFromCompanyResponse {
	routes: Route[];
}
export function useFetchRoutesFromCompany() {
	const { company } = useCompanyStore();
	const { data: routes, isPending: isFetchRoutesFromCompanyPending } =
		useQuery({
			queryKey: ["routes"],
			queryFn: handleFetchRoutesFromCompany,
			enabled: !!company,
		});

	async function handleFetchRoutesFromCompany() {
		const { data } = await api.get<FetchRoutesFromCompanyResponse>(
			`/companies/${company.id}/routes`
		);

		return data.routes;
	}

	return {
		routes,
		isFetchRoutesFromCompanyPending,
	};
}
