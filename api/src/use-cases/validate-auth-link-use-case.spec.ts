import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAuthLinksRepository } from "@/repositories/in-memory/in-memory-auth-links-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { ValidateAuthLinkUseCase } from "@/use-cases/validate-auth-link-use-case";

let authLinksRepository: InMemoryAuthLinksRepository;
let sut: ValidateAuthLinkUseCase;

describe("Validate auth link use case", () => {
	beforeEach(async () => {
		authLinksRepository = new InMemoryAuthLinksRepository();
		sut = new ValidateAuthLinkUseCase(authLinksRepository);

		await authLinksRepository.create({
			code: "123456",
			userId: "user-1",
			createdAt: new Date(),
		});
	});

	it("should be able to validate auth link", async () => {
		const { userId } = await sut.execute({
			code: "123456",
		});

		expect(userId).toEqual(expect.any(String));
		expect(authLinksRepository.items.length).toEqual(1);
	});

	it("should not be able to validate auth link with invalid code", async () => {
		await expect(() =>
			sut.execute({
				code: "1234567",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to validate auth link with more than 7 days", async () => {
		await authLinksRepository.create({
			code: "12345678",
			userId: "user-1",
			createdAt: new Date("2023-01-01T00:00:00.000Z"),
		});

		expect(() =>
			sut.execute({
				code: "12345678",
			})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
