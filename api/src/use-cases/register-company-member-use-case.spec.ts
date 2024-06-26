import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { RegisterCompanyMemberUseCase } from "./register-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMemberRepository: InMemoryCompanyMembersRepository;
let sut: RegisterCompanyMemberUseCase;

describe("Register company member use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMemberRepository = new InMemoryCompanyMembersRepository();
    sut = new RegisterCompanyMemberUseCase(
      companiesRepository,
      companyMemberRepository,
      usersRepository
    );

    await usersRepository.create({
      id: "john-doe-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    await companiesRepository.create({
      name: "Company name",
      documentNumber: "12312312389899",
      size: "MEDIUM",
      type: "HEADQUARTERS",
      ownerId: "john-doe-01",
    });
  });

  it("should be able to register company member", async () => {
    const { companyMemberId } = await sut.execute({
      userId: "john-doe-01",
      creatorId: "john-doe-01",
      role: "OPERATIONAL",
    });

    expect(companyMemberId).toEqual(expect.any(String));
  });

  it("should not be possible to register company member if member already exists", async () => {
    await sut.execute({
      userId: "john-doe-01",
      creatorId: "john-doe-01",
      role: "OPERATIONAL",
    });

    await expect(() =>
      sut.execute({
        userId: "john-doe-01",
        creatorId: "john-doe-01",
        role: "OPERATIONAL",
      })
    ).rejects.toBeInstanceOf(CompanyMemberAlreadyExistsError);
  });
});
