import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryAuthLinksRepository } from "@/repositories/in-memory/in-memory-auth-links-repository";
import { UpdateUserPasswordUseCase } from "@/use-cases/update-user-password-use-case";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let authLinksRepository: InMemoryAuthLinksRepository;
let sut: UpdateUserPasswordUseCase;

describe("Update user password use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		authLinksRepository = new InMemoryAuthLinksRepository();
		sut = new UpdateUserPasswordUseCase(usersRepository, authLinksRepository);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await authLinksRepository.create({
			userId: "john-doe-id-01",
			code: "123456",
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
		expect(authLinksRepository.items).toHaveLength(0);
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
