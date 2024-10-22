import { CompanyMember, Prisma } from "@prisma/client";

export interface CompanyMembersRepository {
	create(
		data: Prisma.CompanyMemberUncheckedCreateInput
	): Promise<CompanyMember>;
	findById(id: string): Promise<CompanyMember | null>;
	findByMemberId(userId: string): Promise<CompanyMember | null>;
	findMemberInCompany(
		userId: string,
		companyId: string
	): Promise<CompanyMember | null>;
	findManyByCompanyId(companyId: string): Promise<CompanyMember[]>;
}
