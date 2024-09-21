import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { BankDetailsRepository } from "@/repositories/bank-details-repository";
import { IAccountTypeOfBankDetails } from "@/interfaces/bank-details";
import { NotAllowedError } from "./errors/not-allowed-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

interface RegisterDriverBankDetailsUseCaseRequest {
  financialInstitution: string;
  accountType: IAccountTypeOfBankDetails;
  agency: number;
  accountNumber: string;
  pixKey?: string | null;
  driverId: string;
  creatorId: string;
}

interface RegisterDriverBankDetailsUseCaseResponse {
  bankDetailsId: string;
}

export class RegisterDriverBankDetailsUseCase {
	constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private driversRepository: DriversRepository,
    private bankDetailsRepository: BankDetailsRepository,
	) {}

	async execute({
		financialInstitution,
		accountType,
		accountNumber,
		agency,
		pixKey,
		driverId,
		creatorId,
	}: RegisterDriverBankDetailsUseCaseRequest): Promise<RegisterDriverBankDetailsUseCaseResponse> {
		const [member, driver] = await Promise.all([
			await this.companyMembersRepository.findByMemberId(creatorId),
			await this.driversRepository.findById(driverId),
		]);

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.role !== "ADMIN" && member.role !== "FINANCIAL") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access",
			);
		}

		const bankDetails = await this.bankDetailsRepository.create({
			financialInstitution,
			accountType,
			accountNumber,
			agency,
			pixKey,
			driverId: driver.id,
		});

		return { bankDetailsId: bankDetails.id };
	}
}
