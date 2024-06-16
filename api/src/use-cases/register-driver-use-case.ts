import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterDriverUseCaseRequest {
  name: string;
  password: string;
  documentNumber: string;
  phone: string;
  backupPhone?: string | null;
  creatorId: string;
  companyId: string;
}

interface RegisterDriverUseCaseResponse {
  driverId: string;
}

export async function registerDriverUseCase({
  name,
  password,
  documentNumber,
  phone,
  backupPhone,
  creatorId,
  companyId,
}: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
  const [user, driverAlreadyExists, company] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    }),
    await prisma.driver.findUnique({
      where: {
        documentNumber,
      },
    }),
    await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    }),
  ]);

  if (user?.role !== ("ADMIN" || "OPERATIONAL")) {
    throw new UnauthorizedError(
      "You do not have permission to perform this action, please ask your administrator for access"
    );
  }

  if (driverAlreadyExists) {
    throw new DriverAlreadyExistsError();
  }

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const passwordHash = await hash(password, 6);

  const driver = await prisma.driver.create({
    data: {
      name,
      password: passwordHash,
      documentNumber,
      phone,
      backupPhone: backupPhone ?? null,
      companyId: company.id,
      creatorId: user.id,
      companyDrivers: {
        create: {
          companyId,
        },
      },
    },
  });

  return {
    driverId: driver.id,
  };
}
