import { Company } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useGetProfile } from "../user/use-get-profile";

interface CompanyInformationResponse {
	company: Company;
}

export function useGetCompanyInformation() {
	const { profile, isGetProfilePending } = useGetProfile();
	const { setCompany } = useCompanyStore();

	const pathName = usePathname();

	const enabledQuery =
		!pathName.includes("/cadastro/empresa") &&
		pathName !== "/" &&
		!isGetProfilePending &&
		profile?.extraData?.onboardingStep === "complete_onboarding";

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
				"/companies/information"
			);
			setCompany(data.company);
			return data.company;
		} catch (error) {
			toast.error("Falha ao encontrar informações da empresa");
		}
	}

	return {
		companyInformation,
		isGetCompanyInformationPending,
	};
}
