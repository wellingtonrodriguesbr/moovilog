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

	const { setCompany } = useCompanyStore();

	const { data: company, isPending: isGetCompanyInformationPending } =
		useQuery({
			queryKey: ["company-information"],
			queryFn: handleGetCompanyInformation,
			enabled: enabledQuery,
		});

	async function handleGetCompanyInformation() {
		try {
			const { data } = await api.get<CompanyInformationResponse>(
				"/companies/information"
			);

			setCompany(data.company);
			return data;
		} catch (error) {
			toast.error("Falha ao encontrar informações da empresa");
		}
	}

	return {
		...company,
		companyAddress: company?.companyAddress,
		isGetCompanyInformationPending,
	};
}
