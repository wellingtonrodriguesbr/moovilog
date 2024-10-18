import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ICompany, ICompanySizes } from "@/interfaces/company";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { UserAlreadyHasACompanyError } from "./errors/user-already-has-a-company-error";

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

		if (!user) {
			throw new ResourceNotFoundError("User not found");
		}

		const companyAlreadyRegisteredWithThisDocument =
			await this.companiesRepository.findByDocumentNumber(documentNumber);

		if (companyAlreadyRegisteredWithThisDocument) {
			throw new CompanyAlreadyExistsError();
		}

		const userAlreadyOwnsAnotherCompany =
			await this.companiesRepository.findByOwnerId(ownerId);

		if (userAlreadyOwnsAnotherCompany) {
			throw new UserAlreadyHasACompanyError();
		}

		const company = await this.companiesRepository.create({
			ownerId: user.id,
			name,
			documentNumber,
			size,
		});

		await this.companyMembersRepository.create({
			userId: user.id,
			companyId: company.id,
			role: "ADMIN",
			sector: ownerSector,
			status: "ACTIVE",
		});

		return { company };
	}
}
