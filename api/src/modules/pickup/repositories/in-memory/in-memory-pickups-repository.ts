import { Pickup, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPickupsRepository implements PickupsRepository {
	public items: Pickup[] = [];

	async create(data: Prisma.PickupUncheckedCreateInput) {
		const pickup = {
			id: data.id || randomUUID(),
			pickupNumber: data.pickupNumber,
			senderName: data.senderName,
			recipientName: data.recipientName,
			status: data.status || "PENDING",
			priority: data.priority || "NORMAL",
			volumeQuantity: data.volumeQuantity,
			weight: new Decimal(data.weight as number | string),
			cubage: data.cubage ? new Decimal(data.cubage as number | string) : null,
			observation: data.observation || null,
			creatorId: data.creatorId || null,
			companyId: data.companyId,
			driverId: data.driverId || null,
			vehicleId: data.vehicleId || null,
			addressId: data.addressId,
			freightId: data.freightId || null,
			collectedAt: data.collectedAt ? new Date(data.collectedAt) : null,
			scheduledDate: new Date(data.scheduledDate),
			requestedAt: new Date(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(pickup);
		return pickup;
	}

	// async findById(id: string) {
	// 	const pickup = this.items.find((item) => item.id === id);

	// 	if (!pickup) {
	// 		return null;
	// 	}

	// 	return pickup;
	// }

	// async findManyByDriverId(driverId: string) {
	// 	const pickups = this.items.filter(
	// 		(item) => item.assignedDriverId === driverId
	// 	);

	// 	return pickups;
	// }

	async findManyByCompanyId(companyId: string) {
		const pickups = this.items.filter((item) => item.companyId === companyId);

		return pickups;
	}
}
