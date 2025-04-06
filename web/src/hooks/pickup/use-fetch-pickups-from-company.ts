import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Freight } from "@/interfaces";
import { useCompanyStore } from "@/stores/company-store";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Pickup } from "@/interfaces/pickup";

interface PickupResponse {
	pickups: Pickup[];
}

export function useFetchPickupsFromCompany() {
	const router = useRouter();
	const { company, isLoading } = useCompanyStore();
	const {
		data: pickupsFromCompany,
		isPending: isFetchPickupsFromCompanyPending,
	} = useQuery({
		queryKey: ["pickups"],
		queryFn: handleFetchPickupsFromCompany,
		enabled: !isLoading,
	});

	async function handleFetchPickupsFromCompany() {
		try {
			const { data } = await api.get<PickupResponse>(
				`/${company?.id}/pickups`
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
		pickupsFromCompany: pickupsFromCompany?.pickups ?? [],
		isFetchPickupsFromCompanyPending,
	};
}
