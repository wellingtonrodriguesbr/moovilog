import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { ICompany, ICompanySizes } from "@/modules/company/interfaces/company";

import { CompanyAlreadyExistsError } from "@/modules/company/use-cases/errors/company-already-exists-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { OwnerAlreadyHasACompanyError } from "@/modules/company/use-cases/errors/owner-already-has-a-company-error";
import { CompanyMemberPermissionsRepository } from "@/modules/company-member/repositories/company-member-permissions-repository";

interface RegisterCompanyUseCaseRequest {
	ownerId: string;
	name: string;
	documentNumber: string;
	ownerSector: string;
	size: ICompanySizes;
}

interface RegisterCompanyUseCaseResponse {
	company: ICompany;
}

export class RegisterCompanyUseCase {
	constructor(
		private companiesRepository: CompaniesRepository,
		private companyMembersRepository: CompanyMembersRepository,
		private companyMemberPermissionsRepository: CompanyMemberPermissionsRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		ownerId,
		name,
		documentNumber,
		ownerSector,
		size,
	}: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
		const user = await this.usersRepository.findById(ownerId);

		console.log(user);

		if (!user) {
			throw new ResourceNotFoundError("User not found");
		}

		const companyAlreadyRegisteredWithThisDocument =
			await this.companiesRepository.findByDocumentNumber(documentNumber);

		if (companyAlreadyRegisteredWithThisDocument) {
			throw new CompanyAlreadyExistsError();
		}

		const ownerAlreadyOwnsAnotherCompany =
			await this.companiesRepository.findByOwnerId(ownerId);

		if (ownerAlreadyOwnsAnotherCompany) {
			throw new OwnerAlreadyHasACompanyError();
		}

		const company = await this.companiesRepository.create({
			ownerId: user.id,
			name,
			documentNumber,
			size,
		});

		const companyMember = await this.companyMembersRepository.create({
			userId: user.id,
			companyId: company.id,
			sector: ownerSector,
			status: "ACTIVE",
		});

		await this.companyMemberPermissionsRepository.createMany([
			{
				companyMemberId: companyMember.id,
				permission: "ADMIN",
			},
		]);

		return { company };
	}
}
