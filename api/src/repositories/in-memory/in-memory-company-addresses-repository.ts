import { CompanyAddress, Prisma } from "@prisma/client";
import { CompanyAddressesRepository } from "../company-addresses-repository";
import { randomUUID } from "crypto";

export class InMemoryCompanyAddressesRepository
implements CompanyAddressesRepository
{
	public items: CompanyAddress[] = [];

	async create(data: Prisma.CompanyAddressUncheckedCreateInput) {
		const companyAddress = {
			id: data.id ?? randomUUID(),
			companyId: data.companyId,
			addressId: data.addressId,
			createdAt: new Date(),
		};

		this.items.push(companyAddress);
		return companyAddress;
	}

	async findByCompanyId(companyId: string) {
		const companyAddress = this.items.find(
			(item) => item.companyId === companyId,
		);

		if (!companyAddress) {
			return null;
		}

		return companyAddress;
	}
}
