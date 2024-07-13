import { Prisma, FreightByCompany } from "@prisma/client";
import { FreightsByCompanyRepository } from "../freights-by-company-repository";
import { randomUUID } from "crypto";

export class InMemoryFreightsByCompanyRepository
  implements FreightsByCompanyRepository
{
  public items: FreightByCompany[] = [];

  async create(data: Prisma.FreightByCompanyUncheckedCreateInput) {
    const freightByCompany = {
      id: data.id ?? randomUUID(),
      freightId: data.freightId,
      companyId: data.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(freightByCompany);

    return freightByCompany;
  }
}
