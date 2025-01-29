import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { Driver } from "@/interfaces";

interface DriverResponse {
	drivers: Driver[];
}

export function useFetchDriversByCompany() {
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();
	const {
		data: driversByCompany,
		isPending: isFetchDriversByCompanyPending,
	} = useQuery({
		queryKey: ["drivers"],
		queryFn: handleFetchDriversByCompany,
		enabled: !!company && !isGetCompanyInformationPending,
	});

	async function handleFetchDriversByCompany() {
		const { data } = await api.get<DriverResponse>(
			`/${company?.id}/drivers`
		);

		return data.drivers;
	}

	return {
		driversByCompany,
		isFetchDriversByCompanyPending,
	};
}
