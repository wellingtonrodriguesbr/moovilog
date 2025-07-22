import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryTokensRepository } from "@/modules/shared/repositories/in-memory/in-memory-tokens-repository";
import { UpdateUserPasswordUseCase } from "@/modules/user/use-cases/update-user-password-use-case";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let tokensRepository: InMemoryTokensRepository;
let sut: UpdateUserPasswordUseCase;

describe("[MODULE]: Update user password use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    tokensRepository = new InMemoryTokensRepository();
    sut = new UpdateUserPasswordUseCase(usersRepository, tokensRepository);

    await usersRepository.create({
      id: "john-doe-id-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
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

    const newPassword = await compare("123456789", usersRepository.items[0].password as string);

    expect(newPassword).toBeTruthy();
    expect(usersRepository.items[0].password).toEqual(expect.any(String));
    expect(tokensRepository.items).toHaveLength(0);
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
