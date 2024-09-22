import { BankDetails, Prisma } from "@prisma/client";

export interface BankDetailsRepository {
	create(data: Prisma.BankDetailsUncheckedCreateInput): Promise<BankDetails>;
}
