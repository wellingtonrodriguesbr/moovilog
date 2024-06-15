import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { AccountTypeOfBankDetails } from "@prisma/client";

interface RegisterDriverBankDetailsUseCaseRequest {
  financialInstitution: string;
  accountType: AccountTypeOfBankDetails;
  agency: number;
  accountNumber: number;
  pixKey?: string | null;
  driverId: string;
}

interface RegisterDriverBankDetailsUseCaseResponse {
  bankDetailsId: string;
}

export async function registerDriverBankDetailsUseCase({
  financialInstitution,
  accountType,
  accountNumber,
  agency,
  pixKey,
  driverId,
}: RegisterDriverBankDetailsUseCaseRequest): Promise<RegisterDriverBankDetailsUseCaseResponse> {
  const driver = await prisma.driver.findUnique({
    where: {
      id: driverId,
    },
  });

  if (!driver) {
    throw new ResourceNotFoundError("Driver not found");
  }

  const bankDetails = await prisma.bankDetails.create({
    data: {
      financialInstitution,
      accountNumber,
      accountType,
      agency,
      driverId: driver.id,
      pixKey,
    },
  });

  return { bankDetailsId: bankDetails.id };
}
