import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { IUser } from "@/modules/user/interfaces/user";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: Omit<IUser, "password">;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      user: {
        ...userWithoutPassword,
      },
    };
  }
}
