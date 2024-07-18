import { Address, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyAddressesRepository } from "../company-addresses-repository";

export class PrismaCompanyAddressesRepository
  implements CompanyAddressesRepository
{
  async create(data: Prisma.AddressUncheckedCreateInput, companyId: string) {
    const address = await prisma.address.create({
      data: {
        ...data,
        companyAddress: {
          create: {
            companyId,
          },
        },
      },
    });

    return address;
  }

  async findByCompanyId(companyId: string) {
    const address = await prisma.address.findFirst({
      where: {
        companyAddress: {
          some: {
            companyId,
          },
        },
      },
    });

    if (!address) {
      return null;
    }

    return address;
  }
}
