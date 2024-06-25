import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MEMBER";
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

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return {
      user,
    };
  }
}
