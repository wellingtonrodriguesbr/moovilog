import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

export interface Route {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	creatorId: string;
	companyId: string;
}

export function useFetchCompanyRoutes() {
	const { companyId } = useCompanyStore();
	const { data: routes, isPending: isFetchCompanyRoutesPending } = useQuery({
		queryKey: ["routes"],
		queryFn: handleFetchCompanyRoutes,
		enabled: !!companyId,
	});

	async function handleFetchCompanyRoutes() {
		const { data } = await api.get<{ routes: Route[] }>(
			`/${companyId}/routes`
		);

		return data.routes;
	}

	return {
		routes,
		isFetchCompanyRoutesPending,
	};
}
