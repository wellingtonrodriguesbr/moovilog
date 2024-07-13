import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CompaniesRepository } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = await prisma.company.create({
      data: {
        ...data,
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

  async findByOwnerId(ownerId: string) {
    const company = await prisma.company.findUnique({
      where: {
        ownerId,
      },
    });

    if (!company) {
      return null;
    }

    return company;
  }

  async findByCompanyMemberId(memberId: string) {
    const company = await prisma.company.findFirst({
      where: {
        companyMembers: {
          some: {
            id: memberId,
          },
        },
      },
    });

    if (!company) {
      return null;
    }

    return company;
  }
}
