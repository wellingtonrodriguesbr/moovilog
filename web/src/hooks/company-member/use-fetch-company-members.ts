import { api } from "@/lib/axios";
import { CompanyMember } from "@/interfaces";
import { useCompanyStore } from "@/stores/company-store";
import { useQuery } from "@tanstack/react-query";

interface FetchMembersFromCompanyResponse {
  companyMembers: CompanyMember[];
}

export function useFetchMembersFromCompany() {
  const { company, isLoading } = useCompanyStore();
  const { data: companyMembers, isPending: isFetchMembersFromCompanyPending } = useQuery({
    queryKey: ["company-members"],
    enabled: !isLoading,
    queryFn: handleFetchMembersFromCompany,
  });

  async function handleFetchMembersFromCompany() {
    const { data } = await api.get<FetchMembersFromCompanyResponse>(`/companies/${company?.id}/members`);

    return data.companyMembers;
  }

  return {
    companyMembers,
    isFetchMembersFromCompanyPending,
  };
}
