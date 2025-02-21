import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SendInvitationToCompanyMemberData {
	name: string;
	email: string;
	sector: string;
	role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "COMERCIAL" | "MANAGER";
}

export function useSendInvitationToCompanyMember() {
	const { company } = useCompanyStore();
	const queryClient = useQueryClient();
	const {
		mutateAsync: sendinvitationtoCompanyMember,
		isPending: isPendingSendInvitationToCompanyMember,
	} = useMutation({
		mutationFn: handleSendInvitationToCompanyMember,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["company-members"] });
		},
	});

	async function handleSendInvitationToCompanyMember(
		sendinvitationtoData: SendInvitationToCompanyMemberData
	) {
		const { data } = await api.post<{ companyMemberId: string }>(
			`/${company.id}/members/invite`,
			{
				...sendinvitationtoData,
			}
		);
		return data;
	}

	return {
		sendinvitationtoCompanyMember,
		isPendingSendInvitationToCompanyMember,
	};
}
