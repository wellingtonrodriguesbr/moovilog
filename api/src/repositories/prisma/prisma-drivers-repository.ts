import { prisma } from "@/lib/prisma";
import { DriversRepository } from "../drivers-repository";
import { Prisma } from "@prisma/client";

export class PrismaDriversRepository implements DriversRepository {
  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = await prisma.driver.create({
      data: {
        name: data.name,
        password: data.password,
        documentNumber: data.documentNumber,
        phone: data.phone,
        backupPhone: data.backupPhone,
        companyId: data.companyId,
        creatorId: data.creatorId,
        companyDrivers: {
          create: {
            companyId: data.companyId,
          },
        },
      },
    });

    return driver;
  }

  async findByDocumentNumber(documentNumber: string) {
    const driver = await prisma.driver.findUnique({
      where: {
        documentNumber,
      },
    });

    if (!driver) {
      return null;
    }

    return driver;
  }

  async findById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    });

    if (!driver) {
      return null;
    }

    return driver;
  }
}
