import { CompanyMemberPermission, Prisma } from "@prisma/client";

export interface CompanyMemberPermissionsRepository {
	createMany(
		data: Prisma.CompanyMemberPermissionUncheckedCreateInput[]
	): Promise<void>;
	findManyByMemberId(
		memberId: string
	): Promise<CompanyMemberPermission[] | null>;
}
