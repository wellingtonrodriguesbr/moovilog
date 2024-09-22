import { Prisma, FreightInformation } from "@prisma/client";
import { FreightInformationRepository } from "../freight-information-repository";
import { randomUUID } from "crypto";

export class InMemoryFreightInformationRepository
	implements FreightInformationRepository
{
	public items: FreightInformation[] = [];

	private toDate(value: string | Date | null | undefined): Date | null {
		return typeof value === "string" ? new Date(value) : (value ?? null);
	}

	async create(data: Prisma.FreightInformationUncheckedCreateInput) {
		const freightInformation = {
			id: data.id ?? randomUUID(),
			freightId: data.freightId,
			initialKM: data.initialKM ?? 0,
			finalKM: data.finalKM ?? 0,
			departureTime: this.toDate(data.departureTime),
			arrivalTime: this.toDate(data.arrivalTime),
			pickupsNotMade: data.pickupsNotMade ?? null,
			deliveriesNotMade: data.deliveriesNotMade ?? null,
			viewed: data.viewed ?? null,
			viewedAt: this.toDate(data.viewedAt),
			updatedAt: this.toDate(data.updatedAt) ?? new Date(),
		};

		this.items.push(freightInformation);

		return freightInformation;
	}

	async findByFreight(freightId: string) {
		const freightInformation = this.items.find(
			(item) => item.freightId === freightId
		);

		if (!freightInformation) {
			return null;
		}

		return freightInformation;
	}
}
