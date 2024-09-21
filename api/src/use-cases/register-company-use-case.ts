import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ICompany, ICompanySizes, ICompanyTypes } from "@/interfaces/company";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

interface RegisterCompanyUseCaseRequest {
  ownerId: string;
  name: string;
  documentNumber: string;
  type: ICompanyTypes;
  size: ICompanySizes;
}

interface RegisterCompanyUseCaseResponse {
  company: ICompany;
}

export class RegisterCompanyUseCase {
	constructor(
    private companiesRepository: CompaniesRepository,
    private companyMembersRepository: CompanyMembersRepository,
    private usersRepository: UsersRepository,
	) {}

	async execute({
		ownerId,
		name,
		documentNumber,
		type,
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

		const company = await this.companiesRepository.create({
			ownerId: user.id,
			name,
			documentNumber,
			size,
			type,
		});

		await this.companyMembersRepository.create({
			memberId: user.id,
			companyId: company.id,
			role: "ADMIN",
		});

		return { company };
	}
}
