import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchCompanyMembersUseCase } from "./fetch-company-members-use-case";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: FetchCompanyMembersUseCase;

describe("Fetch company members use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    sut = new FetchCompanyMembersUseCase(companyMembersRepository);

    await usersRepository.create({
      id: "john-doe-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
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
      memberId: "john-doe-01",
      role: "ADMIN",
    });
  });

  it("should be able to fetch company members", async () => {
    const { companyMembers } = await sut.execute({
      userId: "john-doe-01",
    });

    expect(companyMembers).toHaveLength(1);
  });
});
