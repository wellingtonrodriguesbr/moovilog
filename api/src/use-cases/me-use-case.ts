import { prisma } from "@/lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface MeUseCaseRequest {
  userId: string;
}

interface MeUseCaseResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export async function meUseCase({
  userId,
}: MeUseCaseRequest): Promise<MeUseCaseResponse> {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    throw new ResourceNotFoundError("User profile not found");
  }

  const user = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
  };

  return { user };
}