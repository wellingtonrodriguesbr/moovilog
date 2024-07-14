import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ICompany, ICompanySizes, ICompanyTypes } from "@/interfaces/company";
import { NotAllowedError } from "./errors/not-allowed-error";

interface RegisterCompanyUseCaseRequest {
  userId: string;
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
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    name,
    documentNumber,
    type,
    size,
  }: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== "ADMIN") {
      throw new NotAllowedError();
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

    return { company };
  }
}
