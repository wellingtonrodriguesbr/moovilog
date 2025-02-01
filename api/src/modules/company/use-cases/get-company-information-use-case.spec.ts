import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryAddressesRepository } from "@/modules/shared/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { GetCompanyInformationUseCase } from "@/modules/company/use-cases/get-company-information-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let addressesRepository: InMemoryAddressesRepository;
let citiesRepository: InMemoryCitiesRepository;
let statesRepository: InMemoryStatesRepository;

let sut: GetCompanyInformationUseCase;

describe("[MODULE]: Get company information use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		addressesRepository = new InMemoryAddressesRepository();
		citiesRepository = new InMemoryCitiesRepository();
		statesRepository = new InMemoryStatesRepository();

		sut = new GetCompanyInformationUseCase(
			usersRepository,
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
			areaId: "fake-area-id",
		});

		await addressesRepository.create({
			id: "fake-address-id",
			cityId: "fake-city-id",
			street: "fake street name",
			neighborhood: "fake neighborhood",
			number: 200,
			zipCode: "00000-000",
		});

		await companiesRepository.setCompanyAddress(
			"company-id-01",
			"fake-address-id"
		);
	});

	it("should be able to get company information", async () => {
		const { company, companyAddress } = await sut.execute({
			userId: "john-doe-id-01",
			companyId: "company-id-01",
		});

		expect(company.id).toEqual("company-id-01");
		expect(company.size).toEqual("MEDIUM");
		expect(company.addressId).toEqual("fake-address-id");
		expect(companyAddress.state.id).toEqual("fake-state-id");
	});

	it("not should be able to get company information if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
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
