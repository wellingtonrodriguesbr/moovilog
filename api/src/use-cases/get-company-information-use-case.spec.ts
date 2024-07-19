import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyAddressesRepository } from "@/repositories/in-memory/in-memory-company-addresses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetCompanyInformationUseCase } from "./get-company-information";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryCitiesRepository } from "@/repositories/in-memory/in-memory-cities-repository";
import { InMemoryStatesRepository } from "@/repositories/in-memory/in-memory-states-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyAddressesRepository: InMemoryCompanyAddressesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let addressesRepository: InMemoryAddressesRepository;
let citiesRepository: InMemoryCitiesRepository;
let statesRepository: InMemoryStatesRepository;

let sut: GetCompanyInformationUseCase;

describe("Get company information use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyAddressesRepository = new InMemoryCompanyAddressesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    addressesRepository = new InMemoryAddressesRepository();
    citiesRepository = new InMemoryCitiesRepository();
    statesRepository = new InMemoryStatesRepository();

    sut = new GetCompanyInformationUseCase(
      companyMembersRepository,
      companiesRepository,
      companyAddressesRepository,
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
      type: "HEADQUARTERS",
      ownerId: "john-doe-id-01",
    });

    await companyMembersRepository.create({
      companyId: "company-id-01",
      memberId: "john-doe-id-01",
      role: "ADMIN",
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

    await companyAddressesRepository.create({
      addressId: "fake-address-id",
      companyId: "company-id-01",
    });
  });

  it("should be able to get company information", async () => {
    const { company, companyAddress } = await sut.execute({
      userId: "john-doe-id-01",
    });

    expect(company.id).toEqual("company-id-01");
    expect(company.size).toEqual("MEDIUM");
    expect(companyAddress.state.id).toEqual("fake-state-id");
  });
});
