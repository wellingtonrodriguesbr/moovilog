import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  userId: string;
}

export async function registerUserUseCase({
  name,
  email,
  password,
}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    throw new UserAlreadyExistsError();
  }

  const passwordHash = await hash(password, 6);

  const user = await prisma.user.create({
    data: {
      name,
      password: passwordHash,
      email,
    },
  });

  return {
    userId: user.id,
  };
}
