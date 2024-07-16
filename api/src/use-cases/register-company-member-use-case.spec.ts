import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { RegisterCompanyMemberUseCase } from "./register-company-member-use-case";
import { CompanyMemberAlreadyExistsError } from "./errors/company-member-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: RegisterCompanyMemberUseCase;

describe("Register company member use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    sut = new RegisterCompanyMemberUseCase(companyMembersRepository);

    await usersRepository.create({
      id: "john-doe-id-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    await companiesRepository.create({
      id: "company-id-01",
      name: "Company name",
      documentNumber: "12312312389899",
      size: "MEDIUM",
      type: "HEADQUARTERS",
      ownerId: "john-doe-01",
    });

    await companyMembersRepository.create({
      companyId: "company-id-01",
      memberId: "john-doe-id-01",
      role: "ADMIN",
    });
  });

  it("should be able to register company member", async () => {
    const { companyMemberId } = await sut.execute({
      memberId: "john-doe-member-id",
      creatorId: "john-doe-id-01",
      role: "OPERATIONAL",
    });

    expect(companyMemberId).toEqual(expect.any(String));
  });

  it("should not be possible to register company member if member already exists", async () => {
    await sut.execute({
      memberId: "john-doe-member-id",
      creatorId: "john-doe-id-01",
      role: "OPERATIONAL",
    });

    await expect(() =>
      sut.execute({
        memberId: "john-doe-member-id",
        creatorId: "john-doe-id-01",
        role: "OPERATIONAL",
      })
    ).rejects.toBeInstanceOf(CompanyMemberAlreadyExistsError);
  });

  it("should not be able to register the company member with the a creator role that is different of admin", async () => {
    const member = await companyMembersRepository.create({
      memberId: "john-doe-id-02",
      companyId: "company-id-01",
      role: "FINANCIAL",
    });

    expect(() =>
      sut.execute({
        memberId: "john-doe-id-02",
        role: "OPERATIONAL",
        creatorId: member.memberId,
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
