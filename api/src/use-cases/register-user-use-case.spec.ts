import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUserUseCase } from "./register-user-use-case";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;

describe("Register user use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be possible to register with an existing email", async () => {
    await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "12345678",
        role: "ADMIN",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able possible to generate a hash of the user password in the registry", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    const isPasswordCorrectlyHashed = await compare("12345678", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
