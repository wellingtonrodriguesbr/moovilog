import { Prisma } from "@prisma/client";
import { FreightsByCompanyRepository } from "../freights-by-company-repository";
import { prisma } from "@/lib/prisma";

export class PrismaFreightsByCompanyRepository
  implements FreightsByCompanyRepository
{
  async create(data: Prisma.FreightByCompanyUncheckedCreateInput) {
    const freightByCompany = await prisma.freightByCompany.create({
      data,
    });

    return freightByCompany;
  }
}
