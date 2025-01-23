import { CompanyStateArea, Prisma } from "@prisma/client";
import { CompanyStatesAreasRepository } from "@/modules/company/repositories/company-states-areas-repository";
import { randomUUID } from "node:crypto";

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

	async create(data: Prisma.CompanyStateAreaUncheckedCreateInput) {
		const companyStateArea = {
			id: data.id ?? randomUUID(),
			stateId: data.stateId,
			areaId: data.areaId,
			companyId: data.companyId,
		};

		this.items.push(companyStateArea);

		return companyStateArea;
	}

	async findManyByCompanyId(companyId: string) {
		const companyStatesAreas = this.items.filter(
			(item) => item.companyId === companyId
		);

		return companyStatesAreas;
	}
}
