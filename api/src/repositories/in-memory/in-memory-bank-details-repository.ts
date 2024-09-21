import { BankDetails, Prisma } from "@prisma/client";
import { BankDetailsRepository } from "../bank-details-repository";
import { randomUUID } from "crypto";

export class InMemoryBankDetailsRepository implements BankDetailsRepository {
	public items: BankDetails[] = [];

	async create(data: Prisma.BankDetailsUncheckedCreateInput) {
		const bankDetails = {
			id: randomUUID(),
			financialInstitution: data.financialInstitution,
			accountNumber: data.accountNumber,
			accountType: data.accountType,
			agency: data.agency,
			pixKey: data.pixKey || null,
			driverId: data.driverId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(bankDetails);
		return bankDetails;
	}
}
