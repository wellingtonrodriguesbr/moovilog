import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("12345678", 6),
      role: "ADMIN",
    });

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
});
