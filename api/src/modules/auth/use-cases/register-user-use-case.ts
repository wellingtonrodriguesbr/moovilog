import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";
import { hash } from "bcryptjs";

interface RegisterUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
	phone: string;
}
interface RegisterUserUseCaseResponse {
	userId: string;
}

export class RegisterUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
		phone,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const [userAlreadyExistsWithSameEmail, userAlreadyExistsWithSamePhone] =
			await Promise.all([
				this.usersRepository.findByEmail(email),
				this.usersRepository.findByPhone(phone),
			]);

		if (userAlreadyExistsWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		if (userAlreadyExistsWithSamePhone) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
			phone,
		});

		return {
			userId: user.id,
		};
	}
}
