import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Freight } from "@/interfaces";
import { useCompanyStore } from "@/stores/company-store";

export interface ExtendedFreight extends Freight {
	vehicle: {
		id: string;
		plate: string;
	};
	driver: {
		id: string;
		name: string;
		documentNumber: string;
	};
}

interface FreightResponse {
	freights: ExtendedFreight[];
}

export function useFetchFreightsFromCompany() {
	const { company } = useCompanyStore();
	const {
		data: freightsFromCompany,
		isPending: isFetchFreightsFromCompanyPending,
	} = useQuery({
		queryKey: ["freights"],
		queryFn: handleFetchFreightsFromCompany,
		enabled: !!company,
	});

	async function handleFetchFreightsFromCompany() {
		const { data } = await api.get<FreightResponse>(
			`/${company.id}/freights`
		);

		return data.freights;
	}

	return {
		freightsFromCompany: freightsFromCompany ?? [],
		isFetchFreightsFromCompanyPending,
	};
}
