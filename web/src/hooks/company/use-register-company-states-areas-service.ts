import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";

interface RegisterCompanyStatesAreasServiceData {
	stateAcronyms: string[];
	areaIds: string[];
}

export function useRegisterCompanyStatesAreasService() {
	const { company } = useCompanyStore();

	const {
		mutateAsync: registerCompanyStatesAreasService,
		isPending: isPendingRegisterCompanyStatesAreasService,
	} = useMutation({
		mutationFn: handleRegisterCompanyStatesAreasService,
	});

	async function handleRegisterCompanyStatesAreasService(
		registerData: RegisterCompanyStatesAreasServiceData
	) {
		const { data } = await api.post(
			`/companies/${company.id}/states-areas`,
			{
				...registerData,
			}
		);
		return data;
	}

	return {
		registerCompanyStatesAreasService,
		isPendingRegisterCompanyStatesAreasService:
			isPendingRegisterCompanyStatesAreasService,
	};
}
