import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useGetCompanyInformation } from "./use-get-company-information";

interface RegisterCompanyStatesAreasServiceData {
	stateAcronyms: string[];
	areaIds: string[];
}

export function useRegisterCompanyStatesAreasService() {
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();

	const {
		mutateAsync: registerCompanyStatesAreasService,
		isPending: isPendingRegisterCompanyStatesAreasService,
	} = useMutation({
		mutationFn: handleRegisterCompanyStatesAreasService,
	});

	async function handleRegisterCompanyStatesAreasService(
		registerData: RegisterCompanyStatesAreasServiceData
	) {
		if (company && !isGetCompanyInformationPending) {
			const { data } = await api.post(
				`/companies/${company.id}/areas-states`,
				{
					...registerData,
				}
			);
			return data;
		}
	}

	return {
		registerCompanyStatesAreasService,
		isPendingRegisterCompanyStatesAreasService:
			isPendingRegisterCompanyStatesAreasService ||
			isGetCompanyInformationPending,
	};
}
