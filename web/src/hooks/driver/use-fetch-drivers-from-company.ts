import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Driver } from "@/interfaces";
import { useCompanyStore } from "@/stores/company-store";

interface DriverResponse {
	drivers: Driver[];
}

export function useFetchDriversFromCompany() {
	const { company, isLoading } = useCompanyStore();
	const {
		data: driversFromCompany,
		isPending: isFetchDriversFromCompanyPending,
	} = useQuery({
		queryKey: ["drivers"],
		queryFn: handleFetchDriversFromCompany,
		enabled: !isLoading,
	});

	async function handleFetchDriversFromCompany() {
		const { data } = await api.get<DriverResponse>(
			`/companies/${company?.id}/drivers`
		);

		return data.drivers;
	}

	return {
		driversFromCompany: driversFromCompany ?? [],
		isFetchDriversFromCompanyPending,
	};
}
