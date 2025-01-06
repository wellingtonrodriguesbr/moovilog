import { AuthLinksRepository } from "@/repositories/auth-links-repository";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

import dayjs from "dayjs";

interface ValidateAuthLinkUseCaseRequest {
	code: string;
}

interface ValidateAuthLinkUseCaseResponse {
	userId: string;
}

const EXPIRATION_DAYS = 7;

export class ValidateAuthLinkUseCase {
	constructor(private authLinksRepository: AuthLinksRepository) {}

	async execute({
		code,
	}: ValidateAuthLinkUseCaseRequest): Promise<ValidateAuthLinkUseCaseResponse> {
		const authLink = await this.authLinksRepository.findByCode(code);

		if (!authLink) {
			throw new ResourceNotFoundError(
				`Auth link with code "${code}" not found`
			);
		}

		if (dayjs().diff(authLink.createdAt, "days") > EXPIRATION_DAYS) {
			throw new BadRequestError(`Auth link with code "${code}" is expired`);
		}

		return {
			userId: authLink.userId,
		};
	}
}
