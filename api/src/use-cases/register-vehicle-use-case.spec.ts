import { beforeEach, describe, expect, it } from "vitest";
import { RegisterVehicleUseCase } from "./register-vehicle-use-case";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryVehiclesRepository } from "@/repositories/in-memory/in-memory-vehicles-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

let usersRepository: InMemoryUsersRepository;
let driversRepository: InMemoryDriversRepository;
let vehiclesRepository: InMemoryVehiclesRepository;
let companiesRepository: InMemoryCompaniesRepository;
let sut: RegisterVehicleUseCase;

describe("Register vehicle use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    driversRepository = new InMemoryDriversRepository();
    vehiclesRepository = new InMemoryVehiclesRepository();
    companiesRepository = new InMemoryCompaniesRepository();

    sut = new RegisterVehicleUseCase(
      usersRepository,
      driversRepository,
      vehiclesRepository
    );

    usersRepository.create({
      id: "john-doe-id",
      name: "John Doe",
      email: "johndoe@email.com",
      password: "12345678",
      role: "ADMIN",
    });

    companiesRepository.create({
      id: "company-id",
      name: "Company name",
      documentNumber: "11111111111111",
      size: "MEDIUM",
      type: "BRANCH",
      ownerId: "john-doe-id",
    });

    driversRepository.create({
      id: "john-doe-driver-id",
      name: "John Doe Driver",
      documentNumber: "11111111111",
      password: "12345678",
      phone: "11111111111",
      companyId: "company-id",
      creatorId: "john-doe-id",
    });
  });

  it("should be able to register a vehicle", async () => {
    const { vehicle } = await sut.execute({
      plate: "ABC-123",
      year: 1996,
      body: "CLOSED",
      category: "STRAIGHT_TRUCKS",
      type: "OUTSOURCED",
      fullLoadCapacity: "24.000",
      driverId: "john-doe-driver-id",
      creatorId: "john-doe-id",
    });

    expect(vehicle.id).toEqual(expect.any(String));
  });

  it("not should be able to register a vehicle with same plate", async () => {
    await sut.execute({
      plate: "ABC-123",
      year: 1996,
      body: "CLOSED",
      category: "STRAIGHT_TRUCKS",
      type: "OUTSOURCED",
      fullLoadCapacity: "24.000",
      driverId: "john-doe-driver-id",
      creatorId: "john-doe-id",
    });

    await expect(() =>
      sut.execute({
        plate: "ABC-123",
        year: 1996,
        body: "CLOSED",
        category: "STRAIGHT_TRUCKS",
        type: "OUTSOURCED",
        fullLoadCapacity: "24.000",
        driverId: "john-doe-driver-id",
        creatorId: "john-doe-id",
      })
    ).rejects.toBeInstanceOf(VehicleAlreadyExistsError);
  });

  it("not should be able to register a vehicle with the a creatorId role that is different between operational or admin", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "12345678",
      role: "FINANCIAL",
    });

    await expect(() =>
      sut.execute({
        plate: "ABC-123",
        year: 1996,
        body: "CLOSED",
        category: "STRAIGHT_TRUCKS",
        type: "OUTSOURCED",
        fullLoadCapacity: "24.000",
        driverId: "john-doe-driver-id",
        creatorId: user.id,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
