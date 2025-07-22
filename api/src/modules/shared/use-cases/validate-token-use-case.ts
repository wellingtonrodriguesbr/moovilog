import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";

import dayjs from "dayjs";

interface ValidateTokenUseCaseRequest {
  code: string;
}

interface ValidateTokenUseCaseResponse {
  userId: string;
}

const EXPIRATION_DAYS = 7;

export class ValidateTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({ code }: ValidateTokenUseCaseRequest): Promise<ValidateTokenUseCaseResponse> {
    const token = await this.tokensRepository.findByCode(code);

    if (!token) {
      throw new ResourceNotFoundError(`Token with code "${code}" not found`);
    }

    if (dayjs().diff(token.createdAt, "days") > EXPIRATION_DAYS) {
      throw new BadRequestError(`Token with code "${code}" is expired`);
    }

    return {
      userId: token.userId,
    };
  }
}
