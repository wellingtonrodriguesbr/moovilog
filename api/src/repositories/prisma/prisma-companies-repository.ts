import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CompaniesRepository } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = await prisma.company.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        documentNumber: data.documentNumber,
        type: data.type,
        size: data.size,
        companyMembers: {
          create: {
            memberId: data.ownerId,
            role: "ADMIN",
          },
        },
      },
    });

    return company;
  }

  async findByDocumentNumber(documentNumber: string) {
    const company = await prisma.company.findUnique({
      where: {
        documentNumber,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  }
}
