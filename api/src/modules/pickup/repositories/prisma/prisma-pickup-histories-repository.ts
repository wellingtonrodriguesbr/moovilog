import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PickupHistoriesRepository } from "@/modules/pickup/repositories/pickup-histories-repository";

export class PrismaPickupHistoriesRepository
	implements PickupHistoriesRepository
{
	async create(
		data: Prisma.PickupHistoryUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	) {
		const prismaTransaction = tx ?? prisma;
		await prismaTransaction.pickupHistory.create({
			data,
		});
	}
}
