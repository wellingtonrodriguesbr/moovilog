import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryTokensRepository } from "@/repositories/in-memory/in-memory-tokens-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-members-repository";
import { UpdateUserPasswordUseCase } from "@/use-cases/update-user-password-use-case";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let tokensRepository: InMemoryTokensRepository;
let sut: UpdateUserPasswordUseCase;

describe("Update user password use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		tokensRepository = new InMemoryTokensRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new UpdateUserPasswordUseCase(
			usersRepository,
			companyMembersRepository,
			tokensRepository
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			role: "ADMIN",
		});

		await tokensRepository.create({
			userId: "john-doe-id-01",
			code: "123456",
			type: "AUTH_LINK",
		});
	});

	it("should be able to update password", async () => {
		await sut.execute({
			userId: "john-doe-id-01",
			newPassword: "123456789",
			confirmNewPassword: "123456789",
		});

		const newPassword = await compare(
			"123456789",
			usersRepository.items[0].password as string
		);

		expect(newPassword).toBeTruthy();
		expect(usersRepository.items[0].password).toEqual(expect.any(String));
		expect(tokensRepository.items).toHaveLength(0);
		expect(companyMembersRepository.items[0].status).toStrictEqual("ACTIVE");
	});

	it("should not be able to update password when new password does not match with confirm new password", async () => {
		expect(
			async () =>
				await sut.execute({
					userId: "john-doe-id-01",
					newPassword: "123456789",
					confirmNewPassword: "1234567899",
				})
		).rejects.toBeInstanceOf(BadRequestError);
	});
});
