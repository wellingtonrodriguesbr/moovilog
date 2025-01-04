import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface CompanyMember {
	id: string;
	sector: string;
	role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MANAGER" | "COMERCIAL";
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	createdAt: string;
	updatedAt: string;
	userId: string;
	companyId: string;
	user: User;
}

export interface User {
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
}

export function useFetchCompanyMembers() {
	const { data: companyMembers, isPending: isFetchCompanyMembersPending } =
		useQuery({
			queryKey: ["company-members"],
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
