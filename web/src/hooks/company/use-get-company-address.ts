import { CompanyAddress } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useGetProfile } from "../user/use-get-profile";

interface CompanyAddressResponse {
	companyAddress: CompanyAddress;
}

export function useGetCompanyAddress() {
	const { profile, isGetProfilePending } = useGetProfile();
	const { company } = useCompanyStore();

	const pathName = usePathname();

	const enabledQuery =
		!pathName.includes("/cadastro/empresa") &&
		pathName !== "/" &&
		!isGetProfilePending &&
		profile?.extraData?.onboardingStep === "complete_onboarding";

	const { data: companyAddress, isPending: isGetCompanyAddressPending } =
		useQuery({
			queryKey: ["company-address"],
			queryFn: handleGetCompanyAddress,
			enabled: enabledQuery,
			staleTime: 1000 * 60 * 5, // 5 minutes
		});

	async function handleGetCompanyAddress() {
		try {
			const { data } = await api.get<CompanyAddressResponse>(
				`/companies/${company.id}/address`
			);
			return data.companyAddress;
		} catch (error) {
			toast.error("Falha ao encontrar endereço da empresa");
		}
	}

	return {
		companyAddress,
		isGetCompanyAddressPending,
	};
}
