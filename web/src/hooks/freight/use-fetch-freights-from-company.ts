import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Freight } from "@/interfaces";
import { useCompanyStore } from "@/stores/company-store";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
	summary: {
		totalFreights: number;
		totalDeliveries: number;
		totalWeightOfDeliveries: number;
		totalPickups: number;
		totalWeightOfPickups: number;
		totalFreightsAmountInCents: number;
	};
}

export function useFetchFreightsFromCompany() {
	const router = useRouter();
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
		try {
			const { data } = await api.get<FreightResponse>(
				`/${company.id}/freights`
			);

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 403) {
					toast.error(
						"Você não tem permissão para acessar essa página"
					);
					router.push("/inicio");
				}

				throw error;
			}
		}
	}

	return {
		freightsFromCompany: freightsFromCompany?.freights ?? [],
		totalFreights: freightsFromCompany?.summary.totalFreights ?? 0,
		totalDeliveries: freightsFromCompany?.summary.totalDeliveries ?? 0,
		totalWeightOfDeliveries:
			freightsFromCompany?.summary.totalWeightOfDeliveries ?? 0,
		totalPickups: freightsFromCompany?.summary.totalPickups ?? 0,
		totalWeightOfPickups:
			freightsFromCompany?.summary.totalWeightOfPickups ?? 0,
		totalFreightsAmountInCents:
			freightsFromCompany?.summary.totalFreightsAmountInCents ?? 0,
		isFetchFreightsFromCompanyPending,
	};
}
