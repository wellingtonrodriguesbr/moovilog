import { CompanyAddress } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface CompanyAddressResponse {
  companyAddress: CompanyAddress;
}

export function useGetCompanyAddress() {
  const { company, isLoading } = useCompanyStore();

  console.log(company);

  const pathName = usePathname();

  const enabledQuery = !pathName.includes("/cadastro/empresa") && pathName !== "/" && !isLoading;

  const { data: companyAddress, isPending: isGetCompanyAddressPending } = useQuery({
    queryKey: ["company-address", company?.id],
    queryFn: handleGetCompanyAddress,
    enabled: enabledQuery,
  });

  async function handleGetCompanyAddress() {
    try {
      const { data } = await api.get<CompanyAddressResponse>(`/companies/${company?.id}/address`);
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
