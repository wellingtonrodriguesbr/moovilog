import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

import { hash } from "bcryptjs";

interface UpdateUserPasswordUseCaseRequest {
	userId: string;
	newPassword: string;
	confirmNewPassword: string;
}

export class UpdateUserPasswordUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private tokensRepository: TokensRepository
	) {}
	async execute({
		userId,
		newPassword,
		confirmNewPassword,
	}: UpdateUserPasswordUseCaseRequest): Promise<void> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError("User not found");
		}

		if (newPassword !== confirmNewPassword) {
			throw new BadRequestError("Passwords do not match");
		}

		const passwordHash = await hash(newPassword, 6);

		await this.usersRepository.updatePassword(userId, passwordHash);
		await this.tokensRepository.deleteByUserId(userId);
	}
}
