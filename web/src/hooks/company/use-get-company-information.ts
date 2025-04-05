import { usePathname, useRouter } from "next/navigation";

import { Company } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CompanyInformationResponse {
	company: Company;
}

export function useGetCompanyInformation() {
	const { setCompany, setLoading } = useCompanyStore();

	const router = useRouter();
	const pathName = usePathname();

	const enabledQuery =
		!pathName.includes("/cadastro/empresa") && pathName !== "/";

	const {
		data: companyInformation,
		isPending: isGetCompanyInformationPending,
	} = useQuery({
		queryKey: ["company-information"],
		queryFn: handleGetCompanyInformation,
		enabled: enabledQuery,
	});

	async function handleGetCompanyInformation() {
		setLoading(true);
		try {
			const { data } = await api.get<CompanyInformationResponse>(
				"/companies/information"
			);
			setCompany(data.company);
			return data.company;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (
					error.response?.status === 400 &&
					error.response.data.message ===
						"Complete the company registration first"
				) {
					router.push("/cadastro/empresa");
					toast.warning("Cadastre sua empresa");
					return;
				}
				if (
					error.response?.status === 400 &&
					error.response.data.message ===
						"Complete the company address registration first"
				) {
					router.push("/cadastro/empresa/endereco");
					toast.warning("Cadastre o endereço da empresa");
					return;
				}
			}
			toast.error("Falha ao encontrar informações da empresa");
		} finally {
			setLoading(false);
		}
	}

	return {
		companyInformation,
		isGetCompanyInformationPending,
	};
}
