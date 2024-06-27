import { beforeEach, describe, expect, it } from "vitest";
import { RegisterDriverUseCase } from "./register-driver-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let driversRepository: InMemoryDriversRepository;
let sut: RegisterDriverUseCase;

describe("Register driver use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    driversRepository = new InMemoryDriversRepository();

    sut = new RegisterDriverUseCase(
      usersRepository,
      companyMembersRepository,
      driversRepository
    );

    companiesRepository = new InMemoryCompaniesRepository();

    await usersRepository.create({
      id: "john-doe-id-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    await companiesRepository.create({
      id: "company-id-01",
      name: "Company Name",
      documentNumber: "12312312312312",
      size: "BIG",
      type: "AGENCY",
      ownerId: "john-doe-id-01",
    });
  });

  it("should be able to register driver", async () => {
    const driver = await driversRepository.create({
      name: "John Doe Driver",
      password: "123123123",
      documentNumber: "12312312312",
      phone: "11999999999",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
    });

    expect(driver.id).toEqual(expect.any(String));
  });

  it("should not be able to register driver with an existing same document number", async () => {
    await driversRepository.create({
      name: "John Doe Driver",
      password: "123123123",
      documentNumber: "12312312312",
      phone: "11999999999",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe Driver",
        password: "123123123",
        documentNumber: "12312312312",
        phone: "11999999999",
        creatorId: "john-doe-id-01",
      })
    ).rejects.toBeInstanceOf(DriverAlreadyExistsError);
  });

  it("should not be possible to register the driver with the creatorId role different between operational or admin", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "FINANCIAL",
    });

    expect(() =>
      sut.execute({
        name: "John Doe Driver",
        password: "123123123",
        documentNumber: "12312312312",
        phone: "11999999999",
        creatorId: user.id,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it.skip("should be able possible to generate a hash of the driver password in the registry", async () => {
    const { driver } = await sut.execute({
      name: "John Doe Driver",
      password: "123123123",
      documentNumber: "12312312312",
      phone: "11999999999",
      creatorId: "john-doe-id-01",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123123123",
      driver.password
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
