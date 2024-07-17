import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterFreightUseCase } from "./register-freight-use-case";
import { InMemoryFreightsRepository } from "@/repositories/in-memory/in-memory-freights-repository";
import { InMemoryFreightInformationRepository } from "@/repositories/in-memory/in-memory-freight-information-repository";
import { InMemoryCitiesByFreightRepository } from "@/repositories/in-memory/in-memory-cities-by-freight-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { BadRequestError } from "./errors/bad-request-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let freightsRepository: InMemoryFreightsRepository;
let freightInformationRepository: InMemoryFreightInformationRepository;
let citiesByFreightRepository: InMemoryCitiesByFreightRepository;
let sut: RegisterFreightUseCase;

describe("Register freight use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();

    companyMembersRepository = new InMemoryCompanyMembersRepository();
    driversRepository = new InMemoryDriversRepository();
    freightsRepository = new InMemoryFreightsRepository();
    freightInformationRepository = new InMemoryFreightInformationRepository();
    citiesByFreightRepository = new InMemoryCitiesByFreightRepository();

    sut = new RegisterFreightUseCase(
      companyMembersRepository,
      driversRepository,
      freightsRepository,
      freightInformationRepository,
      citiesByFreightRepository
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

    await driversRepository.create({
      id: "john-doe-driver-id",
      name: "John Doe Driver",
      documentNumber: "11111111111",
      password: "12345678",
      phone: "11111111111",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
    });

    await companyMembersRepository.create({
      companyId: "company-id-01",
      memberId: "john-doe-id-01",
      role: "ADMIN",
    });
  });

  it("should be able to register a freight", async () => {
    const { freight } = await sut.execute({
      date: new Date(),
      type: "FRACTIONAL",
      deliveriesQuantity: 12,
      pickupsQuantity: 5,
      totalWeightOfDeliveries: 2400,
      totalWeightOfPickups: 1000,
      freightAmountInCents: 60000,
      citiesIds: ["fake-city-01", "fake-city-02"],
      creatorId: "john-doe-id-01",
      driverId: "john-doe-driver-id",
    });

    expect(freight.id).toEqual(expect.any(String));
    expect(citiesByFreightRepository.items).toHaveLength(2);
    expect(freightInformationRepository.items).toHaveLength(1);
  });

  it("not should be able to register a freight with the a creator role that is different between operational or admin", async () => {
    const member = await companyMembersRepository.create({
      memberId: "john-doe-id-02",
      companyId: "company-id-01",
      role: "MEMBER",
    });

    expect(() =>
      sut.execute({
        date: new Date(),
        type: "FRACTIONAL",
        deliveriesQuantity: 12,
        pickupsQuantity: 5,
        totalWeightOfDeliveries: 2400,
        totalWeightOfPickups: 1000,
        freightAmountInCents: 60000,
        citiesIds: ["fake-city-01", "fake-city-02"],
        creatorId: member.memberId,
        driverId: "john-doe-driver-id",
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });

  it("not should be able to register a freight with a date less than the current date", async () => {
    expect(() =>
      sut.execute({
        date: new Date("2024-07-15 09:00:00"),
        type: "FRACTIONAL",
        deliveriesQuantity: 12,
        pickupsQuantity: 5,
        totalWeightOfDeliveries: 2400,
        totalWeightOfPickups: 1000,
        freightAmountInCents: 60000,
        citiesIds: ["fake-city-01", "fake-city-02"],
        creatorId: "john-doe-id-01",
        driverId: "john-doe-driver-id",
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
