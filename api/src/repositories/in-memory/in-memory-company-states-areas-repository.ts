import { randomUUID } from "node:crypto";
import { CompanyStateArea, Prisma } from "@prisma/client";
import { CompanyStatesAreasRepository } from "@/repositories/company-states-areas-repository";

export class InMemoryCompanyStatesAreasRepository
	implements CompanyStatesAreasRepository
{
	public items: CompanyStateArea[] = [];

	async createMany(data: Prisma.CompanyStateAreaUncheckedCreateInput[]) {
		const newEntries = data.map((entry) => ({
			id: entry.id ?? randomUUID(),
			stateId: entry.stateId,
			areaId: entry.areaId,
			companyId: entry.companyId,
		}));

		const uniqueEntries = newEntries.filter(
			(newEntry) =>
				!this.items.some(
					(existingItem) =>
						existingItem.stateId === newEntry.stateId &&
						existingItem.areaId === newEntry.areaId &&
						existingItem.companyId === newEntry.companyId
				)
		);

		this.items.push(...uniqueEntries);
	}
}
