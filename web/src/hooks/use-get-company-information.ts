import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export interface Company {
	id: string;
	name: string;
	documentNumber: string;
	size: string;
	createdAt: string;
	updatedAt: string;
	ownerId: string;
}

export interface CompanyAddress {
	address: Address;
	city: City;
	state: State;
}

export interface Address {
	id: string;
	zipCode: string;
	street: string;
	neighborhood: string;
	number: number;
	complement: string;
	createdAt: string;
	cityId: string;
}

export interface City {
	id: string;
	name: string;
	stateId: string;
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
	const pathName = usePathname();
	const { data: company, isPending: isGetCompanyInformationPending } =
		useQuery({
			queryKey: ["company-information"],
			queryFn: handleGetCompanyInformation,
			enabled:
				pathName !== "/cadastro/empresa" &&
				pathName !== "/cadastro/empresa/endereco",
		});

	async function handleGetCompanyInformation() {
		try {
			const { data } = await api.get<CompanyInformationResponse>(
				"/companies/information"
			);

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
