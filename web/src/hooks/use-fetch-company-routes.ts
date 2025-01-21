import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Route {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	creatorId: string;
	companyId: string;
}

export function useFetchCompanyRoutes() {
	const { data: routes, isPending: isFetchCompanyRoutesPending } = useQuery({
		queryKey: ["routes"],
		queryFn: handleFetchCompanyRoutes,
	});

	async function handleFetchCompanyRoutes() {
		const { data } = await api.get<{ routes: Route[] }>("/company/routes");

		return data.routes;
	}

	return {
		routes,
		isFetchCompanyRoutesPending,
	};
}
