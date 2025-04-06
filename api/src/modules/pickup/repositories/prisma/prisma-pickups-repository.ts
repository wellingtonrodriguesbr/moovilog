import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";

export class PrismaPickupsRepository implements PickupsRepository {
	async create(
		data: Prisma.PickupUncheckedCreateInput,
		tx?: Prisma.TransactionClient
	) {
		const prismaTransaction = tx ?? prisma;
		const pickup = await prismaTransaction.pickup.create({
			data,
		});

		return pickup;
	}

	// async findById(freightId: string) {
	// 	const freight = await prisma.freight.findUnique({
	// 		where: {
	// 			id: freightId,
	// 		},
	// 		include: {
	// 			creator: {
	// 				select: {
	// 					id: true,
	// 					role: true,
	// 					user: {
	// 						select: {
	// 							id: true,
	// 							name: true,
	// 							email: true,
	// 						},
	// 					},
	// 				},
	// 			},
	// 			vehicle: {
	// 				select: {
	// 					id: true,
	// 					plate: true,
	// 				},
	// 			},
	// 			driver: {
	// 				select: {
	// 					id: true,
	// 					name: true,
	// 					documentNumber: true,
	// 				},
	// 			},
	// 			route: {
	// 				select: {
	// 					id: true,
	// 					name: true,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	if (!freight) {
	// 		return null;
	// 	}

	// 	return freight;
	// }

	// async findManyByDriverId(driverId: string) {
	// 	const pickups = await prisma.freight.findMany({
	// 		where: {
	// 			driverId,
	// 		},
	// 	});

	// 	return pickups;
	// }

	async findManyByCompanyId(companyId: string) {
		const pickups = await prisma.pickup.findMany({
			where: {
				companyId,
			},
		});

		return pickups;
	}
}
