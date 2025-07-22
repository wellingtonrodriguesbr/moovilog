import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/modules/driver/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { DriverAlreadyExistsError } from "@/modules/driver/use-cases/errors/driver-already-exists-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { RegisterDriverUseCase } from "@/modules/driver/use-cases/register-driver-use-case";
import { PermissionService } from "@/services/permission-service";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;

let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let permissionService: PermissionService;
let sut: RegisterDriverUseCase;

describe("[MODULE]: Register driver use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    driversRepository = new InMemoryDriversRepository();
    permissionService = new PermissionService(companyMembersRepository);

    sut = new RegisterDriverUseCase(companyMembersRepository, driversRepository, permissionService);

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
      ownerId: "john-doe-id-01",
    });

    await companyMembersRepository.create({
      id: "company-member-id-01",
      companyId: "company-id-01",
      userId: "john-doe-id-01",
      sector: "Diretoria",
      extraData: {
        permissions: ["SUPER_ADMIN"],
      },
    });
  });

  it("should be able to register driver", async () => {
    const { driver } = await sut.execute({
      name: "John Doe Driver",
      documentNumber: "12312312312",
      phone: "11999999999",
      type: "AGGREGATE",
      creatorId: "john-doe-id-01",
    });

    expect(driver.id).toEqual(expect.any(String));
    expect(driversRepository.items).toHaveLength(1);
    expect(driversRepository.items[0].creatorId).toEqual("company-member-id-01");
  });

  it("should not be able to register driver with an existing same document number in company", async () => {
    await sut.execute({
      name: "John Doe Driver",
      documentNumber: "12312312312",
      phone: "11999999999",
      type: "AGGREGATE",
      creatorId: "john-doe-id-01",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe Driver",
        documentNumber: "12312312312",
        phone: "11999999999",
        type: "AGGREGATE",
        creatorId: "john-doe-id-01",
      })
    ).rejects.toBeInstanceOf(DriverAlreadyExistsError);
  });

  it("should not be possible to register a driver if the creator does not have the necessary permissions", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    const member = await companyMembersRepository.create({
      userId: user.id,
      companyId: "company-id-01",
      extraData: {
        permissions: ["VIEW_ROUTES"],
      },
      sector: "Logística",
    });

    expect(() =>
      sut.execute({
        name: "John Doe Driver",
        documentNumber: "12312312313",
        phone: "11999999999",
        type: "AGGREGATE",
        creatorId: member.userId,
      })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
