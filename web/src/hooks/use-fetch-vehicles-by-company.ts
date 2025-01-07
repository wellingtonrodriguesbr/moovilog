import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";

export interface Vehicle {
	id: string;
	plate: string;
	year: number;
	brand: string;
	model: string;
	category: string;
	type: string;
	body: string;
	fullLoadCapacity: number;
	createdAt: string;
	updatedAt: string;
	companyId: string;
	creatorId: string;
}

export function useFetchVehiclesByCompany() {
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();
	const {
		data: vehiclesByCompany,
		isPending: isFetchVehiclesByCompanyPending,
	} = useQuery({
		queryKey: ["vehicles"],
		queryFn: handleFetchVehiclesByCompany,
		enabled: !!company && !isGetCompanyInformationPending,
	});

	async function handleFetchVehiclesByCompany() {
		const { data } = await api.get<{ vehicles: Vehicle[] }>(
			`/${company?.id}/vehicles`
		);

		return data.vehicles;
	}

	return {
		vehiclesByCompany,
		isFetchVehiclesByCompanyPending,
	};
}
