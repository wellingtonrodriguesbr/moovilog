import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface RegisterCompanyAddressData {
	cityName: string;
	street: string;
	neighborhood: string;
	number: number;
	complement?: string | null;
	zipCode: string;
	acronym: string;
}

interface Response {
	address: {
		id: string;
		zipCode: string;
		street: string;
		neighborhood: string;
		number: number;
		complement: string | null;
		createdAt: Date;
		cityId: string;
	};
}

export function useRegisterCompanyAddress() {
	const {
		mutateAsync: registerCompanyAddress,
		isPending: isPendingRegisterCompanyAddress,
	} = useMutation({
		mutationFn: handleRegisterCompanyAddress,
		onError: (error: AxiosError) => {
			if (error.response?.status === 401) {
				toast.error("Você não tem permissão para esta ação");
			}
			if (error.response?.status === 404) {
				toast.error("Falha ao cadastrar, tente novamente");
			}
		},
	});

	async function handleRegisterCompanyAddress({
		cityName,
		street,
		neighborhood,
		number,
		zipCode,
		complement,
	}: RegisterCompanyAddressData) {
		const { data } = await api.post<{ address: Response }>(
			"/companies/address",
			{
				cityName,
				street,
				neighborhood,
				number,
				zipCode,
				complement,
			}
		);
		return data.address;
	}

	return { registerCompanyAddress, isPendingRegisterCompanyAddress };
}
