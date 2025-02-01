import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@/interfaces/vehicle";
import { useCompanyStore } from "@/stores/company-store";

interface VehicleResponse {
	vehicles: Vehicle[];
}

export function useFetchVehiclesFromCompany() {
	const { company } = useCompanyStore();
	const {
		data: vehiclesFromCompany,
		isPending: isFetchVehiclesFromCompanyPending,
	} = useQuery({
		queryKey: ["vehicles"],
		queryFn: handleFetchVehiclesFromCompany,
		enabled: !!company,
	});

	async function handleFetchVehiclesFromCompany() {
		const { data } = await api.get<VehicleResponse>(
			`/companies/${company.id}/vehicles`
		);

		return data.vehicles;
	}

	return {
		vehiclesFromCompany: vehiclesFromCompany ?? [],
		isFetchVehiclesFromCompanyPending,
	};
}
