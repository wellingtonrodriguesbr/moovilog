import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompanyMembersRepository } from "@/repositories/in-memory/in-memory-company-member-repository";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterDriverBankDetailsUseCase } from "./register-driver-bank-details-use-case";
import { InMemoryBankDetailsRepository } from "@/repositories/in-memory/in-memory-bank-details-repository";
import { NotAllowedError } from "./errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let bankDetailsRepository: InMemoryBankDetailsRepository;
let sut: RegisterDriverBankDetailsUseCase;

describe("Register driver bank details use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();

    companyMembersRepository = new InMemoryCompanyMembersRepository();
    driversRepository = new InMemoryDriversRepository();
    bankDetailsRepository = new InMemoryBankDetailsRepository();
    sut = new RegisterDriverBankDetailsUseCase(
      companyMembersRepository,
      driversRepository,
      bankDetailsRepository
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

    await driversRepository.create({
      id: "john-doe-driver-id",
      name: "John Doe Driver",
      documentNumber: "11111111111",
      password: "12345678",
      phone: "11111111111",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
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
      creatorId: "john-doe-id-01",
    });

    expect(bankDetailsId).toEqual(expect.any(String));
  });

  it("not should be able to register a bank details with the a userId role that is different between financial or admin", async () => {
    const member = await companyMembersRepository.create({
      companyId: "company-id-01",
      memberId: "john-doe-id-02",
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
        creatorId: member.memberId,
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
