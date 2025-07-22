import { FinanceCategory, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FinanceCategoriesRepository } from "@/modules/financial/repositories/finance-categories-repository";

export class InMemoryFinanceCategoriesRepository implements FinanceCategoriesRepository {
  public items: FinanceCategory[] = [];

  async create(data: Prisma.FinanceCategoryUncheckedCreateInput) {
    const category = {
      id: data.id ?? randomUUID(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(category);
    return category;
  }

  async findByName(name: string) {
    const category = this.items.find((category) => category.name === name);

    if (!category) {
      return null;
    }

    return category;
  }

  async findMany() {
    return this.items;
  }
}
