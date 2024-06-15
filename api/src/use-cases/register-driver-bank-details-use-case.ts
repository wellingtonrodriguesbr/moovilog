import { prisma } from "../lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { AccountTypeOfBankDetails } from "@prisma/client";
import { UnauthorizedError } from "./errors/unauthorized-error";

interface RegisterDriverBankDetailsUseCaseRequest {
  financialInstitution: string;
  accountType: AccountTypeOfBankDetails;
  agency: number;
  accountNumber: number;
  pixKey?: string | null;
  driverId: string;
  userId: string;
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
  userId,
}: RegisterDriverBankDetailsUseCaseRequest): Promise<RegisterDriverBankDetailsUseCaseResponse> {
  const [user, driver] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    }),
  ]);

  if (!driver) {
    throw new ResourceNotFoundError("Driver not found");
  }

  if (user?.role !== ("ADMIN" || "FINANCIAL")) {
    throw new UnauthorizedError(
      "You do not have permission to perform this action, please ask your administrator for access"
    );
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
