import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryDriversRepository } from "@/modules/driver/repositories/in-memory/in-memory-drivers-repository";
import { UpdateDriverUseCase } from "@/modules/driver/use-cases/update-driver-use-case";
import { PermissionService } from "@/services/permission-service";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let driversRepository: InMemoryDriversRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let permissionService: PermissionService;
let sut: UpdateDriverUseCase;

describe("[MODULE]: Update driver use case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    driversRepository = new InMemoryDriversRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    companyMembersRepository = new InMemoryCompanyMembersRepository();
    permissionService = new PermissionService(companyMembersRepository);
    sut = new UpdateDriverUseCase(companyMembersRepository, driversRepository, permissionService);

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
      id: "driver-id-01",
      name: "John Doe Driver",
      documentNumber: "12312312312",
      phone: "11999999999",
      type: "AGGREGATE",
      companyId: "company-id-01",
      creatorId: "john-doe-id-01",
    });
  });

  it("should be able to update driver", async () => {
    await sut.execute({
      driverId: "driver-id-01",
      userId: "john-doe-01",
      name: "John Doe Driver Updated",
    });

    expect(driversRepository.items).toHaveLength(1);
    expect(driversRepository.items[0].name).toStrictEqual("John Doe Driver Updated");
  });

  it("should not be able to update driver if user does not have the necessary permission", async () => {
    const user = await usersRepository.create({
      id: "john-doe-02",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    await companyMembersRepository.create({
      companyId: "company-id-01",
      userId: user.id,
      sector: "Gerência",
      extraData: {
        permissions: ["VIEW_VEHICLES_AND_DRIVERS"],
      },
    });

    expect(
      async () =>
        await sut.execute({
          driverId: "driver-id-01",
          userId: user.id,
          name: "John Doe Driver Updated",
        })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
