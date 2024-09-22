import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface CompanyMember {
	id: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	memberId: string;
	companyId: string;
	member: Member;
}

export interface Member {
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export function useFetchCompanyMembers() {
	const { data: companyMembers, isPending: isFetchCompanyMembersPending } =
		useQuery({
			queryKey: ["fetch-company-members"],
			queryFn: handleFetchCompanyMembers,
		});

	async function handleFetchCompanyMembers() {
		const { data } = await api.get<{ companyMembers: CompanyMember[] }>(
			"/companies/members"
		);

		return data.companyMembers;
	}

	return {
		companyMembers,
		isFetchCompanyMembersPending,
	};
}
