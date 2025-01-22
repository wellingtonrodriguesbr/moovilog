import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

import { RegisterUserUseCase } from "@/modules/auth/use-cases/register-user-use-case";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";

import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;

describe("[MODULE]: Register user use case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUserUseCase(usersRepository);
	});

	it("should be able to register", async () => {
		const { userId } = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "15999999999",
		});

		expect(userId).toEqual(expect.any(String));
	});

	it("should not be able to register with an existing phone number", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "15999999999",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe1@example.com",
				password: "12345678",
				phone: "15999999999",
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should not be able to register with an existing email", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "15999999999",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email: "johndoe@example.com",
				password: "12345678",
				phone: "15999999999",
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should be able to generate a hash of the user password in the registry", async () => {
		await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "15999999999",
		});

		const isPasswordCorrectlyHashed = await hash("12345678", 6);

		expect(isPasswordCorrectlyHashed).toEqual(expect.any(String));
	});
});
