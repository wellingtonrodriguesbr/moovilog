import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { IUser } from "@/interfaces/user";
import { hash } from "bcryptjs";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUserUseCaseResponse {
  user: IUser;
}

export class RegisterUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
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
		});

		return {
			user,
		};
	}
}
