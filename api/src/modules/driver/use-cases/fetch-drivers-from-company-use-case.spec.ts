import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/modules/driver/repositories/in-memory/in-memory-drivers-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { FetchDriversFromCompanyUseCase } from "@/modules/driver/use-cases/fetch-drivers-from-company-use-case";

let usersRepository: InMemoryUsersRepository;
let driversRepository: InMemoryDriversRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let sut: FetchDriversFromCompanyUseCase;

describe("[MODULE]: Fetch drivers from company use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    driversRepository = new InMemoryDriversRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    sut = new FetchDriversFromCompanyUseCase(driversRepository, companiesRepository, companyMembersRepository);

    await usersRepository.create({
      id: "john-doe-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    await companiesRepository.create({
      id: "company-id-01",
      name: "Company name",
      documentNumber: "12312312389899",
      size: "MEDIUM",
      ownerId: "john-doe-01",
    });

    await companyMembersRepository.create({
      companyId: "company-id-01",
      userId: "john-doe-01",
      sector: "Gerência",
      extraData: {
        permissions: ["ADMIN"],
      },
    });

    await driversRepository.create({
      name: "John Doe Driver",
      documentNumber: "12312312312",
      phone: "11999999999",
      type: "AGGREGATE",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
    });
  });

  it("should be able to fetch drivers in company", async () => {
    const { drivers } = await sut.execute({
      companyId: "company-id-01",
      userId: "john-doe-01",
    });

    expect(driversRepository.items).toHaveLength(1);
    expect(drivers[0].id).toEqual(expect.any(String));
    expect(drivers[0].companyId).toStrictEqual("company-id-01");
  });

  it("should not be able to fetch drivers by company if user is not a company member", async () => {
    expect(
      async () =>
        await sut.execute({
          companyId: "company-id-01",
          userId: "wrong-user-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
