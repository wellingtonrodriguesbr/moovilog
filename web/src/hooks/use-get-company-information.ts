import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Company {
  id: string;
  name: string;
  documentNumber: string;
  type: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface CompanyAddress {
  address: Address;
}

export interface Address {
  id: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  number: number;
  complement: string;
  city: City;
}

export interface City {
  id: string;
  name: string;
  state: State;
}

export interface State {
  id: string;
  name: string;
  acronym: string;
}

interface CompanyInformationResponse {
  company: Company;
  companyAddress: CompanyAddress;
}

export function useGetCompanyInformation() {
  const { data: company, isPending: isGetCompanyInformationPending } = useQuery(
    {
      queryKey: ["company-information"],
      queryFn: handleGetCompanyInformation,
    }
  );

  async function handleGetCompanyInformation() {
    const { data } = await api.get<CompanyInformationResponse>(
      "/companies/information"
    );

    return data;
  }

  return {
    company,
    isGetCompanyInformationPending,
  };
}
