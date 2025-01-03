import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface CompanyMember {
	id: string;
	sector: string;
	role: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	companyId: string;
	user: User;
}

export interface User {
	name: string;
	email: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
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
