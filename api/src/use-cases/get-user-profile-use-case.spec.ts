import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";

let usersRepository: InMemoryUsersRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		sut = new GetUserProfileUseCase(usersRepository, companyMembersRepository);
	});

	it("should be able to get user profile", async () => {
		const user = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		const profile = await sut.execute({ userId: user.id });

		expect(profile.user.name).toEqual(expect.any(String));
	});

	it("should not be able to get user profile with wrong userId", async () => {
		expect(() =>
			sut.execute({
				userId: "does-not-exist-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
