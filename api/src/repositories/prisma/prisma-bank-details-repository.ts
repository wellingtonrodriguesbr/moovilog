import { Prisma } from "@prisma/client";
import { BankDetailsRepository } from "../bank-details-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBankDetailsRepository implements BankDetailsRepository {
  async create(data: Prisma.BankDetailsUncheckedCreateInput) {
    const bankDetails = await prisma.bankDetails.create({
      data: {
        financialInstitution: data.financialInstitution,
        accountNumber: data.accountNumber,
        accountType: data.accountType,
        agency: data.agency,
        pixKey: data.pixKey,
        driverId: data.driverId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return bankDetails;
  }
}
