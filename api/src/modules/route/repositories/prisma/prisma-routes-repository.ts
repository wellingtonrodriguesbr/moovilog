import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";

export class PrismaRoutesRepository implements RoutesRepository {
  async create(data: Prisma.RouteUncheckedCreateInput) {
    const route = await prisma.route.create({
      data,
    });

    return route;
  }

  async findById(id: string) {
    const route = await prisma.route.findUnique({
      where: {
        id,
      },
    });

    if (!route) {
      return null;
    }

    return route;
  }

  async findRouteInCompanyWithSameName(name: string, companyId: string) {
    const route = await prisma.route.findFirst({
      where: {
        name,
        companyId,
      },
    });

    return route;
  }

  async findManyByCompanyId(companyId: string) {
    const routes = await prisma.route.findMany({
      where: {
        companyId,
      },
      include: {
        creator: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return routes;
  }
}
