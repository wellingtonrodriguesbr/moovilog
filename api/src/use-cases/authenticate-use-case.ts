import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

import { compareSync } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export async function authenticateUseCase({
  email,
  password,
}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }

  if (user.email !== email) {
    throw new InvalidCredentialsError("Incorrect email or password");
  }

  const doesPasswordsMatch = compareSync(password, user.password);

  if (!doesPasswordsMatch) {
    throw new InvalidCredentialsError("Incorrect email or password");
  }

  return { user };
}
