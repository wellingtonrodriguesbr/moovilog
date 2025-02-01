import { Company, CompanyAddress } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface CompanyInformationResponse {
	company: Company;
	companyAddress: CompanyAddress;
}

export function useGetCompanyInformation() {
	const pathName = usePathname();
	const enabledQuery = pathName !== "/cadastro/empresa" && pathName !== "/";

	const { company } = useCompanyStore();

	const {
		data: companyInformation,
		isPending: isGetCompanyInformationPending,
	} = useQuery({
		queryKey: ["company-information"],
		queryFn: handleGetCompanyInformation,
		enabled: enabledQuery,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	async function handleGetCompanyInformation() {
		try {
			const { data } = await api.get<CompanyInformationResponse>(
				`/companies/${company.id}/information`
			);
			return data;
		} catch (error) {
			toast.error("Falha ao encontrar informações da empresa");
		}
	}

	return {
		...companyInformation,
		companyAddress: companyInformation?.companyAddress,
		isGetCompanyInformationPending,
	};
}
