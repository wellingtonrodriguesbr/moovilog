import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { Vehicle } from "@/interfaces/vehicle";

interface VehicleResponse {
	vehicles: Vehicle[];
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
		const { data } = await api.get<VehicleResponse>(
			`/${company?.id}/vehicles`
		);

		return data.vehicles;
	}

	return {
		vehiclesByCompany,
		isFetchVehiclesByCompanyPending,
	};
}
