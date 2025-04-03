import { Permissions } from "@/modules/company-member/interfaces/company-member-permission";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";

export class PermissionService {
	constructor(private companyMembersRepository: CompanyMembersRepository) {}

	async hasPermission(
		memberId: string,
		requiredPermissions: Permissions[]
	): Promise<boolean> {
		const companyMember =
			await this.companyMembersRepository.findById(memberId);

		if (!companyMember) {
			return false;
		}

		const permissions = (
			companyMember.extraData as { permissions: Permissions[] }
		)?.permissions;

		if (permissions.length === 0) {
			return false;
		}

		const userPermissionsSet = new Set(
			permissions.map((permission) => permission)
		);

		return requiredPermissions.some((perm) => userPermissionsSet.has(perm));
	}
}
