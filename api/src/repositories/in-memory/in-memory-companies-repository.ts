import { Company, Prisma } from "@prisma/client";
import { CompaniesRepository } from "../companies-repository";
import { randomUUID } from "crypto";

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = [];

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = {
      id: randomUUID(),
      ownerId: data.ownerId,
      name: data.name,
      documentNumber: data.documentNumber,
      size: data.size,
      type: data.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(company);
    return company;
  }

  async findByDocumentNumber(documentNumber: string) {
    const company = this.items.find(
      (item) => item.documentNumber === documentNumber
    );

    if (!company) return null;

    return company;
  }

  async findByOwnerId(ownerId: string) {
    const company = this.items.find((item) => item.ownerId === ownerId);

    if (!company) return null;

    return company;
  }
}
