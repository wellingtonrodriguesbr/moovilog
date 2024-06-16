import { prisma } from "@/lib/prisma";
import { Driver } from "@prisma/client";

import { compareSync } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface DriverAuthenticateUseCaseRequest {
  documentNumber: string;
  password: string;
}

interface DriverAuthenticateUseCaseResponse {
  driver: Driver;
}

export async function driverAuthenticateUseCase({
  documentNumber,
  password,
}: DriverAuthenticateUseCaseRequest): Promise<DriverAuthenticateUseCaseResponse> {
  const driver = await prisma.driver.findUnique({
    where: {
      documentNumber,
    },
  });

  if (!driver) {
    throw new InvalidCredentialsError("Incorrect document number or password");
  }

  const doesPasswordsMatch = compareSync(password, driver.password);

  if (!doesPasswordsMatch) {
    throw new InvalidCredentialsError("Incorrect document number or password");
  }

  return { driver };
}
