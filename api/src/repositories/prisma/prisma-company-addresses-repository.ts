import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyAddressesRepository } from "../company-addresses-repository";

export class PrismaCompanyAddressesRepository
implements CompanyAddressesRepository
{
	async create(data: Prisma.CompanyAddressUncheckedCreateInput) {
		const address = await prisma.companyAddress.create({
			data,
		});

		return address;
	}

	async findByCompanyId(companyId: string) {
		const companyAddress = await prisma.companyAddress.findFirst({
			where: {
				companyId,
			},
		});

		if (!companyAddress) {
			return null;
		}

		return companyAddress;
	}
}
