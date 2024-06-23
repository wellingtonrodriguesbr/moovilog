import { prisma } from "@/lib/prisma";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetProfileUseCaseRequest {
  userId: string;
}

interface GetProfileUseCaseResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export async function getProfileUseCase({
  userId,
}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
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
