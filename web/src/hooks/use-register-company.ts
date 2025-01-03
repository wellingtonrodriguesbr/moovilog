import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterCompanyData {
	name: string;
	documentNumber: string;
	size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
}

interface Response {
	company: {
		id: string;
		name: string;
		documentNumber: string;
		type: string;
		size: string;
		createdAt: Date;
		updatedAt: Date;
		ownerId: string;
	};
}

export function useRegisterCompany() {
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
		const { data } = await api.post<{ company: Response }>("/companies", {
			name,
			documentNumber,
			size,
			ownerSector: "Diretoria",
		});
		return data.company;
	}

	return { registerCompany, isPendingRegisterCompany };
}
