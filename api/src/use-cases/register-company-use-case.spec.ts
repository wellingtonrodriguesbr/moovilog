import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { RegisterCompanyUseCase } from "./register-company-use-case";
import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let sut: RegisterCompanyUseCase;

describe("Register company use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    sut = new RegisterCompanyUseCase(companiesRepository, usersRepository);

    await usersRepository.create({
      id: "john-doe-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });
  });

  it("should be able to register company", async () => {
    const { company } = await sut.execute({
      name: "Company name",
      documentNumber: "12312312389899",
      size: "MEDIUM",
      type: "HEADQUARTERS",
      userId: "john-doe-01",
    });

    expect(company.id).toEqual(expect.any(String));
    expect(company.size).toEqual("MEDIUM");
  });

  it("should not be possible to register company with an existing document number", async () => {
    await sut.execute({
      name: "Company name",
      documentNumber: "12312312389899",
      size: "MEDIUM",
      type: "HEADQUARTERS",
      userId: "john-doe-01",
    });

    await expect(() =>
      sut.execute({
        name: "Company name",
        documentNumber: "12312312389899",
        size: "MEDIUM",
        type: "HEADQUARTERS",
        userId: "john-doe-01",
      })
    ).rejects.toBeInstanceOf(CompanyAlreadyExistsError);
  });
});
