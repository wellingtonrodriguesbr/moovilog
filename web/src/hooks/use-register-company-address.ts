import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterCompanyAddressData {
	cityName: string;
	street: string;
	neighborhood: string;
	number: number;
	complement?: string | null;
	zipCode: string;
	stateAcronym: string;
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
	});

	async function handleRegisterCompanyAddress(
		registerData: RegisterCompanyAddressData
	) {
		const { data } = await api.post<{ address: Response }>(
			"/companies/address",
			{
				...registerData,
			}
		);
		return data.address;
	}

	return { registerCompanyAddress, isPendingRegisterCompanyAddress };
}
