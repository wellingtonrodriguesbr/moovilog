import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryAddressesRepository } from "@/modules/shared/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { GetCompanyAddressUseCase } from "@/modules/company/use-cases/get-company-address-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let addressesRepository: InMemoryAddressesRepository;
let citiesRepository: InMemoryCitiesRepository;
let statesRepository: InMemoryStatesRepository;

let sut: GetCompanyAddressUseCase;

describe("[MODULE]: Get company address use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    addressesRepository = new InMemoryAddressesRepository();
    citiesRepository = new InMemoryCitiesRepository();
    statesRepository = new InMemoryStatesRepository();

    sut = new GetCompanyAddressUseCase(
      companyMembersRepository,
      companiesRepository,
      addressesRepository,
      citiesRepository,
      statesRepository
    );

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
      ownerId: "john-doe-01",
    });

    await companyMembersRepository.create({
      id: "company-member-id-01",
      companyId: "company-id-01",
      userId: "john-doe-id-01",
      sector: "Diretoria",
      extraData: {
        permissions: ["MANAGE_VEHICLES_AND_DRIVERS"],
      },
    });

    await statesRepository.create({
      id: "fake-state-id",
      name: "São Paulo",
      acronym: "SP",
    });

    await citiesRepository.create({
      id: "fake-city-id",
      name: "São Paulo",
      stateId: "fake-state-id",
    });

    await addressesRepository.create({
      id: "fake-address-id",
      cityId: "fake-city-id",
      street: "fake street name",
      neighborhood: "fake neighborhood",
      number: 200,
      zipCode: "00000-000",
    });

    await companiesRepository.setCompanyAddress("company-id-01", "fake-address-id");
  });

  it("should be able to get company information", async () => {
    const { companyAddress } = await sut.execute({
      userId: "john-doe-id-01",
      companyId: "company-id-01",
    });

    expect(companyAddress.address.id).toEqual("fake-address-id");
    expect(companyAddress.state.id).toEqual("fake-state-id");
  });

  it("not should be able to get company information if the company is not found", async () => {
    await expect(() =>
      sut.execute({
        userId: "john-doe-id-01",
        companyId: "non-existent-company-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("not should be able to get company information if user is not member of the company", async () => {
    await usersRepository.create({
      id: "john-doe-id-03",
      name: "John Doe",
      email: "johndoe3@example.com",
      password: "12345678",
    });

    await expect(() =>
      sut.execute({
        userId: "john-doe-id-03",
        companyId: "company-id-01",
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
