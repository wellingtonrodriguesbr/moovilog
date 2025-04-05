import { Pickup, Prisma } from "@prisma/client";

export interface PickupsRepository {
	create(
		data: Prisma.PickupUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	): Promise<Pickup>;
	// findById(id: string): Promise<Pickup | null>;
	// findManyByDriverId(driverId: string): Promise<Pickup[]>;
	// findManyByCompanyId(companyId: string): Promise<Pickup[]>;
}
