import { compare } from "bcryptjs";
import { IUser } from "@/modules/shared/interfaces/user";
import { InvalidCredentialsError } from "@/modules/auth/use-cases/errors/invalid-credentials-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import { UsersRepository } from "@/modules/user/repositories/users-repository";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: Omit<IUser, "password">;
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

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userWithoutPassword } = user;

		return { user: userWithoutPassword };
	}
}
