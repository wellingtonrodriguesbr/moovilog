import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "@/modules/user/use-cases/get-user-profile-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("[MODULE]: Get user profile use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);

    await usersRepository.create({
      id: "john-doe-id-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });
  });

  it("should be able to get user profile", async () => {
    const profile = await sut.execute({ userId: "john-doe-id-01" });

    expect(profile.user.name).toEqual(expect.any(String));
    expect(profile.user.email).toStrictEqual("johndoe@example.com");
  });

  it("should not be able to get user profile with wrong userId", async () => {
    expect(() =>
      sut.execute({
        userId: "does-not-exist-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
