import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MEMBER";
  createdAt: Date;
  updatedAt: Date;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError("Incorrect email or password");
    }

    const doesPasswordsMatch = await compare(password, user.password);

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError("Incorrect email or password");
    }

    return { user };
  }
}
