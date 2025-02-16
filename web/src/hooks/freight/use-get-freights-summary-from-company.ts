import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface SummaryResponse {
	summary: {
		totalFreights: number;
		totalDeliveries: number;
		totalWeightOfDeliveries: number;
		totalPickups: number;
		totalWeightOfPickups: number;
		totalFreightsAmount: number;
	};
}

export function useGetFreightsSummaryFromCompany() {
	const { company } = useCompanyStore();
	const { data: summary, isPending: isGetFreightsSummaryPending } = useQuery({
		queryKey: ["freights-summary"],
		queryFn: handleGetFreightsSummaryFromCompany,
		enabled: !!company,
	});

	async function handleGetFreightsSummaryFromCompany() {
		const { data } = await api.get<SummaryResponse>(
			`/${company.id}/freights/summary`
		);

		return data.summary;
	}

	return {
		summary,
		isGetFreightsSummaryPending,
	};
}
