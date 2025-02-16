import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { CompanyMember, Route } from "@/interfaces";

type SimplifiedUser = Omit<
	CompanyMember["user"],
	"phone" | "createdAt" | "updatedAt"
>;

interface SimplifiedCompanyMember extends Omit<CompanyMember, "user"> {
	user: SimplifiedUser;
}

export interface ExtendedRoute extends Route {
	creator: SimplifiedCompanyMember;
}

interface FetchRoutesFromCompanyResponse {
	routes: ExtendedRoute[];
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
		routes: routes ?? [],
		isFetchRoutesFromCompanyPending,
	};
}
