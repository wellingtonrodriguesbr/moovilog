import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterDriverBankDetailsUseCase } from "./register-driver-bank-details-use-case";
import { InMemoryBankDetailsRepository } from "@/repositories/in-memory/in-memory-bank-details-repository";
import { UnauthorizedError } from "./errors/unauthorized-error";

let usersRepository: InMemoryUsersRepository;
let driversRepository: InMemoryDriversRepository;
let bankDetailsRepository: InMemoryBankDetailsRepository;
let sut: RegisterDriverBankDetailsUseCase;

describe("Register driver bank details use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    driversRepository = new InMemoryDriversRepository();
    bankDetailsRepository = new InMemoryBankDetailsRepository();
    sut = new RegisterDriverBankDetailsUseCase(
      usersRepository,
      driversRepository,
      bankDetailsRepository
    );

    await usersRepository.create({
      id: "john-doe-id-01",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "ADMIN",
    });

    driversRepository.create({
      id: "john-doe-driver-id",
      name: "John Doe Driver",
      documentNumber: "11111111111",
      password: "12345678",
      phone: "11111111111",
      companyId: "",
      creatorId: "john-doe-id",
    });
  });

  it("should be able to register a bank details for the a driver", async () => {
    const { bankDetailsId } = await sut.execute({
      financialInstitution: "Banco 0101",
      accountType: "CURRENT_ACCOUNT",
      accountNumber: "01010101-0",
      agency: 1122,
      pixKey: "00000000000",
      driverId: "john-doe-driver-id",
      userId: "john-doe-id-01",
    });

    expect(bankDetailsId).toEqual(expect.any(String));
  });

  it("not should be able to register a bank details with the a userId role that is different between financial or admin", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "12345678",
      role: "OPERATIONAL",
    });

    await expect(() =>
      sut.execute({
        financialInstitution: "Banco 0101",
        accountType: "CURRENT_ACCOUNT",
        accountNumber: "01010101-0",
        agency: 1122,
        pixKey: "00000000000",
        driverId: "john-doe-driver-id",
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
