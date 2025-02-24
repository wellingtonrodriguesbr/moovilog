import { ICompanyMemberPermission } from "@/modules/company-member/interfaces/company-member-permission";
import { CompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/company-member-permissions-repository";

type PermissionType = ICompanyMemberPermission;

export class PermissionService {
	constructor(
		private companyMemberPermissionsRepository: CompanyMemberPermissionsRepository
	) {}

	async hasPermission(
		memberId: string,
		requiredPermissions: PermissionType[]
	): Promise<boolean> {
		const memberPermissions =
			await this.companyMemberPermissionsRepository.findManyByMemberId(
				memberId
			);

		if (!memberPermissions || memberPermissions.length === 0) {
			return false;
		}

		const userPermissionsSet = new Set(
			memberPermissions.map((perm) => perm.permission)
		);
		return requiredPermissions.some((perm) => userPermissionsSet.has(perm));
	}
}
