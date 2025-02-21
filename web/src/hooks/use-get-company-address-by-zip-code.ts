import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";
import { useDebounce } from "react-use";
import { toast } from "sonner";

interface UseGetCompanyAddressByZipCodeProps {
	zipCode: string;
}

export interface DataResponse {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
}

export function useGetCompanyAddressByZipCode({
	zipCode,
}: UseGetCompanyAddressByZipCodeProps) {
	const [isReady] = useDebounce(
		() => {
			setDebouncedValue(zipCode);
		},
		4000,
		[zipCode]
	);
	const [debouncedValue, setDebouncedValue] = useState("");

	const { data, isPending, status } = useQuery({
		queryKey: ["get-company-address", debouncedValue],
		queryFn: () => handleValidZipCode({ zipCode }),
		enabled:
			!!isReady() && !!debouncedValue.length && debouncedValue.length > 5,
	});

	async function handleValidZipCode({ zipCode }: { zipCode: string }) {
		try {
			const { data } = await axios.get<DataResponse>(
				`https://brasilapi.com.br/api/cep/v2/${zipCode}`
			);

			toast.success("CEP encontrado com sucesso");

			return data;
		} catch (error) {
			toast.error("CEP não encontrado, tente novamente");
			console.log(error);
		}
	}

	return {
		data,
		isPendingGetCompanyAddress: isPending,
		status,
	};
}
