import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";

export class PrismaFreightsRepository implements FreightsRepository {
	async create(data: Prisma.FreightUncheckedCreateInput) {
		const freight = await prisma.freight.create({
			data,
		});

		return freight;
	}

	async findById(freightId: string) {
		const freight = await prisma.freight.findUnique({
			where: {
				id: freightId,
			},
			include: {
				creator: {
					select: {
						id: true,
						role: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
					},
				},
				vehicle: {
					select: {
						id: true,
						plate: true,
					},
				},
				driver: {
					select: {
						id: true,
						name: true,
						documentNumber: true,
					},
				},
				route: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		if (!freight) {
			return null;
		}

		return freight;
	}

	async findManyByDriverId(driverId: string) {
		const freights = await prisma.freight.findMany({
			where: {
				driverId,
			},
		});

		return freights;
	}

	async findManyByCompanyId(companyId: string) {
		const freights = await prisma.freight.findMany({
			where: {
				companyId,
			},
		});

		return freights;
	}
}
