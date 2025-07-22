import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

import { AuthenticateUseCase } from "@/modules/auth/use-cases/authenticate-use-case";
import { InvalidCredentialsError } from "@/modules/auth/use-cases/errors/invalid-credentials-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("[MODULE]: Authenticate use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("12345678", 6),
      phone: "15999999999",
    });
  });

  it("should be able to authenticate", async () => {
    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "johndoeeee@example.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "11111111",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with missing password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe1@example.com",
    });

    expect(() =>
      sut.execute({
        email: "johndoe1@example.com",
        password: "11111111",
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
