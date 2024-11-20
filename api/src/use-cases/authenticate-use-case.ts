import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
import { IUser } from "@/interfaces/user";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: IUser;
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

		if (!user.password) {
			throw new BadRequestError("Password is missing");
		}

		const doesPasswordsMatch = await compare(password, user.password);

		if (!doesPasswordsMatch) {
			throw new InvalidCredentialsError("Incorrect email or password");
		}

		return { user };
	}
}
