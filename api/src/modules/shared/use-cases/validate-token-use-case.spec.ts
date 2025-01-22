import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTokensRepository } from "@/modules/shared/repositories/in-memory/in-memory-tokens-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { ValidateTokenUseCase } from "@/modules/shared/use-cases/validate-token-use-case";

let tokensRepository: InMemoryTokensRepository;
let sut: ValidateTokenUseCase;

describe("[MODULE]: Validate token use case", () => {
	beforeEach(async () => {
		tokensRepository = new InMemoryTokensRepository();
		sut = new ValidateTokenUseCase(tokensRepository);

		await tokensRepository.create({
			code: "123456",
			userId: "user-1",
			type: "AUTH_LINK",
			createdAt: new Date(),
		});
	});

	it("should be able to validate token", async () => {
		const { userId } = await sut.execute({
			code: "123456",
		});

		expect(userId).toEqual(expect.any(String));
		expect(tokensRepository.items.length).toEqual(1);
	});

	it("should not be able to validate token with invalid code", async () => {
		await expect(() =>
			sut.execute({
				code: "1234567",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to validate token with more than 7 days", async () => {
		await tokensRepository.create({
			code: "12345678",
			userId: "user-1",
			type: "AUTH_LINK",
			createdAt: new Date("2023-01-01T00:00:00.000Z"),
		});

		expect(() =>
			sut.execute({
				code: "12345678",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
