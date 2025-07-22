import { Company } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";

interface RegisterCompanyData {
  name: string;
  documentNumber: string;
  size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
  ownerSector: string;
}

interface CompanyResponse {
  company: Company;
}

export function useRegisterCompany() {
  const { setCompany } = useCompanyStore();

  const { mutateAsync: registerCompany, isPending: isPendingRegisterCompany } = useMutation({
    mutationFn: handleRegisterCompany,
  });

  async function handleRegisterCompany(registerData: RegisterCompanyData) {
    const { data } = await api.post<CompanyResponse>("/companies", {
      ...registerData,
    });
    setCompany(data.company);
    return data.company;
  }

  return { registerCompany, isPendingRegisterCompany };
}
