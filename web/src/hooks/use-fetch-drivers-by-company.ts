import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";

export interface Driver {
	id: string;
	name: string;
	documentNumber: string;
	phone: string;
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	type: "AGGREGATE" | "FREELANCER" | "INTERNAL";
	createdAt: string;
	updatedAt: string;
	creatorId: string;
	companyId: string;
	addressId: string | null;
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
		const { data } = await api.get<{ drivers: Driver[] }>(
			`/${company?.id}/drivers`
		);

		return data.drivers;
	}

	return {
		driversByCompany,
		isFetchDriversByCompanyPending,
	};
}
