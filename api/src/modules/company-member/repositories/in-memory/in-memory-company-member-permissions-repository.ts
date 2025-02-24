import { CompanyMemberPermission, Prisma } from "@prisma/client";
import { CompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/company-member-permissions-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCompanyMembersRepository
	implements CompanyMemberPermissionsRepository
{
	public items: CompanyMemberPermission[] = [];

	async createMany(data: Prisma.CompanyMemberPermissionUncheckedCreateInput[]) {
		const permissions = data.map((data) => ({
			id: data.id ?? randomUUID(),
			companyMemberId: data.companyMemberId,
			permission: data.permission,
		}));

		this.items.push(...permissions);
	}

	async findManyByMemberId(memberId: string) {
		const permissions = this.items.filter(
			(permission) => permission.companyMemberId === memberId
		);

		if (!permissions) {
			return null;
		}

		return permissions;
	}
}
