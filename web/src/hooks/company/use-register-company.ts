import { Company } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";

interface RegisterCompanyData {
	name: string;
	documentNumber: string;
	size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
}

interface CompanyResponse {
	company: Company;
}

export function useRegisterCompany() {
	const { setCompany } = useCompanyStore();

	const {
		mutateAsync: registerCompany,
		isPending: isPendingRegisterCompany,
	} = useMutation({
		mutationFn: handleRegisterCompany,
	});

	async function handleRegisterCompany({
		name,
		documentNumber,
		size,
	}: RegisterCompanyData) {
		const { data } = await api.post<CompanyResponse>("/companies", {
			name,
			documentNumber,
			size,
			ownerSector: "Diretoria",
		});
		setCompany(data.company);
		return data.company;
	}

	return { registerCompany, isPendingRegisterCompany };
}
