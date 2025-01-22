import { CompanyMember, Prisma } from "@prisma/client";

export interface CompanyMembersRepository {
	create(
		data: Prisma.CompanyMemberUncheckedCreateInput
	): Promise<CompanyMember>;
	findById(id: string): Promise<CompanyMember | null>;
	findByUserId(userId: string): Promise<CompanyMember | null>;
	findMemberInCompany(
		userId: string,
		companyId: string
	): Promise<CompanyMember | null>;
	findManyByCompanyId(companyId: string): Promise<CompanyMember[]>;
	updateAccountStatus(id: string, status: "ACTIVE" | "INACTIVE"): Promise<void>;
}
