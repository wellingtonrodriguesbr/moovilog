import { Freight, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { randomUUID } from "node:crypto";

export class InMemoryFreightsRepository implements FreightsRepository {
	public items: Freight[] = [];

	async create(data: Prisma.FreightUncheckedCreateInput) {
		const freight = {
			id: data.id ?? randomUUID(),
			type: data.type,
			modality: data.modality,
			date: new Date(data.date),
			pickupsQuantity: data.pickupsQuantity || null,
			deliveriesQuantity: data.deliveriesQuantity,
			totalWeightOfPickups: data.totalWeightOfPickups
				? new Decimal(data.totalWeightOfPickups as number | string)
				: null,
			totalWeightOfDeliveries: new Decimal(
				data.totalWeightOfDeliveries as number | string
			),
			freightAmountInCents: data.freightAmountInCents,
			observation: data.observation || null,
			creatorId: data.creatorId || null,
			driverId: data.driverId,
			companyId: data.companyId,
			routeId: data.routeId || null,
			vehicleId: data.vehicleId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(freight);
		return freight;
	}

	async findById(freightId: string) {
		const freight = this.items.find((item) => item.id === freightId);

		if (!freight) {
			return null;
		}

		return freight;
	}

	async findManyByDriverId(driverId: string) {
		const freights = this.items.filter((item) => item.driverId === driverId);

		return freights;
	}

	async findManyByCompanyId(companyId: string) {
		const freights = this.items.filter((item) => item.companyId === companyId);

		return freights;
	}
}
