import { TokensRepository } from "@/repositories/tokens-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

import { hash } from "bcryptjs";

interface UpdateUserPasswordUseCaseRequest {
	userId: string;
	newPassword: string;
	confirmNewPassword: string;
}

export class UpdateUserPasswordUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private companyMembersRepository: CompanyMembersRepository,
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

		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.status === "PENDING") {
			await this.companyMembersRepository.updateAccountStatus(
				member.id,
				"ACTIVE"
			);
		}
	}
}
