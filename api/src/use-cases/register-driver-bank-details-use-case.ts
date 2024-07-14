import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { BankDetailsRepository } from "@/repositories/bank-details-repository";
import { IAccountTypeOfBankDetails } from "@/interfaces/bank-details";
import { NotAllowedError } from "./errors/not-allowed-error";

interface RegisterDriverBankDetailsUseCaseRequest {
  financialInstitution: string;
  accountType: IAccountTypeOfBankDetails;
  agency: number;
  accountNumber: string;
  pixKey?: string | null;
  driverId: string;
  userId: string;
}

interface RegisterDriverBankDetailsUseCaseResponse {
  bankDetailsId: string;
}

export class RegisterDriverBankDetailsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private driversRepository: DriversRepository,
    private bankDetailsRepository: BankDetailsRepository
  ) {}

  async execute({
    financialInstitution,
    accountType,
    accountNumber,
    agency,
    pixKey,
    driverId,
    userId,
  }: RegisterDriverBankDetailsUseCaseRequest): Promise<RegisterDriverBankDetailsUseCaseResponse> {
    const [user, driver] = await Promise.all([
      await this.usersRepository.findById(userId),
      await this.driversRepository.findById(driverId),
    ]);

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
    }

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== "ADMIN" && user.role !== "FINANCIAL") {
      throw new NotAllowedError(
        "You do not have permission to perform this action, please ask your administrator for access"
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
