import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/company-member-permissions-repository";

export class PrismaCompanyMemberPermissionsRepository
	implements CompanyMemberPermissionsRepository
{
	async createMany(data: Prisma.CompanyMemberPermissionUncheckedCreateInput[]) {
		await prisma.companyMemberPermission.createMany({
			data,
		});
	}

	async findManyByMemberId(memberId: string) {
		const permissions = await prisma.companyMemberPermission.findMany({
			where: {
				companyMemberId: memberId,
			},
		});

		return permissions;
	}
}
