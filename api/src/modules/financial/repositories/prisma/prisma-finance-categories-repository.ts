import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FinanceCategoriesRepository } from "@/modules/financial/repositories/finance-categories-repository";

export class PrismaFinanceCategoriesRepository implements FinanceCategoriesRepository {
  async create(data: Prisma.FinanceCategoryUncheckedCreateInput) {
    const category = await prisma.financeCategory.create({
      data,
    });

    return category;
  }

  async findByName(name: string) {
    const category = await prisma.financeCategory.findUnique({
      where: {
        name,
      },
    });

    return category;
  }

  async findMany() {
    const categories = await prisma.financeCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }
}
