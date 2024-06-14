import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

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
  const [user, driverAlreadyExists] = await Promise.all([
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
  ]);

  if (user?.role !== ("ADMIN" || "OPERATIONAL")) {
    throw new UnauthorizedError(
      "You do not have permission to perform this action, please ask your administrator for access"
    );
  }

  if (driverAlreadyExists) {
    throw new DriverAlreadyExistsError();
  }

  const passwordHash = await hash(password, 6);

  const driver = await prisma.driver.create({
    data: {
      name,
      password: passwordHash,
      documentNumber,
      phone,
      backupPhone: backupPhone ?? null,
      companyId,
      creatorId: user.id,
      company_drivers: {
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
