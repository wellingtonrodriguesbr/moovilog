import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryTokensRepository } from "@/modules/shared/repositories/in-memory/in-memory-tokens-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { CompleteRegistrationUseCase } from "@/modules/user/use-cases/complete-registration-use-case";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/modules/auth/use-cases/errors/user-already-exists-error";

import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let tokensRepository: InMemoryTokensRepository;
let sut: CompleteRegistrationUseCase;

describe("[MODULE]: Complete registration use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		tokensRepository = new InMemoryTokensRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new CompleteRegistrationUseCase(
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
		});

		await tokensRepository.create({
			userId: "john-doe-id-01",
			code: "123456",
			type: "AUTH_LINK",
		});
	});

	it("should be able to complete registration", async () => {
		await sut.execute({
			userId: "john-doe-id-01",
			phone: "11999999999",
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

	it("should not be able to complete registration when user already exists with same phone", async () => {
		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
			phone: "11999999999",
		});

		expect(
			async () =>
				await sut.execute({
					userId: "john-doe-id-02",
					phone: "11999999999",
					newPassword: "123456789",
					confirmNewPassword: "123456789",
				})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should not be able to complete registration when new password does not match with confirm new password", async () => {
		expect(
			async () =>
				await sut.execute({
					userId: "john-doe-id-01",
					phone: "11999999999",
					newPassword: "123456789",
					confirmNewPassword: "123456788",
				})
		).rejects.toBeInstanceOf(BadRequestError);
	});

	it("should not be able to complete registration when user does not exist", async () => {
		expect(
			async () =>
				await sut.execute({
					userId: "non-existing-user-id",
					phone: "11999999999",
					newPassword: "123456789",
					confirmNewPassword: "123456789",
				})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to complete registration when token does not exist", async () => {
		expect(
			async () =>
				await sut.execute({
					userId: "user-id-without-token",
					phone: "11999999999",
					newPassword: "123456789",
					confirmNewPassword: "123456789",
				})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not call updateAccountStatus if member status is different from PENDING", async () => {
		const spyUpdateAccountStatus = vi.spyOn(
			companyMembersRepository,
			"updateAccountStatus"
		);

		companyMembersRepository.items[0].status = "ACTIVE";

		await sut.execute({
			userId: "john-doe-id-01",
			phone: "11999999999",
			newPassword: "123456789",
			confirmNewPassword: "123456789",
		});

		expect(spyUpdateAccountStatus).not.toHaveBeenCalled();
	});
});
