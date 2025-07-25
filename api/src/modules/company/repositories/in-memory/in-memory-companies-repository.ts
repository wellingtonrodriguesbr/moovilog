import { Company, Prisma } from "@prisma/client";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = [];

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = {
      id: data.id ?? randomUUID(),
      ownerId: data.ownerId,
      name: data.name,
      documentNumber: data.documentNumber,
      size: data.size,
      addressId: data.addressId ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(company);
    return company;
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id);

    if (!company) return null;

    return company;
  }

  async findByDocumentNumber(documentNumber: string) {
    const company = this.items.find((item) => item.documentNumber === documentNumber);

    if (!company) return null;

    return company;
  }

  async findByOwnerId(ownerId: string) {
    const company = this.items.find((item) => item.ownerId === ownerId);

    if (!company) return null;

    return company;
  }

  async setCompanyAddress(companyId: string, addressId: string) {
    const company = this.items.find((item) => item.id === companyId);

    if (!company) throw new Error("Company not found");

    company.addressId = addressId;
    this.items.push(company);
  }
}
