import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryCitiesRepository } from "@/modules/shared/repositories/in-memory/in-memory-cities-repository";
import { InMemoryAddressesRepository } from "@/modules/shared/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryStatesRepository } from "@/modules/shared/repositories/in-memory/in-memory-states-repository";
import { RegisterCompanyAddressUseCase } from "@/modules/company/use-cases/register-company-address-use-case";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let citiesRepository: InMemoryCitiesRepository;
let statesRepository: InMemoryStatesRepository;
let addressesRepository: InMemoryAddressesRepository;
let sut: RegisterCompanyAddressUseCase;

describe("[MODULE]: Register company address use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		citiesRepository = new InMemoryCitiesRepository();
		statesRepository = new InMemoryStatesRepository();
		addressesRepository = new InMemoryAddressesRepository();

		sut = new RegisterCompanyAddressUseCase(
			addressesRepository,
			citiesRepository,
			statesRepository,
			companiesRepository
		);

		await usersRepository.create({
			id: "fake-user-id",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await statesRepository.create({
			id: "fake-state-id",
			name: "São Paulo",
			acronym: "SP",
		});

		await companiesRepository.create({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "fake-user-id",
		});

		await citiesRepository.create({
			id: "fake-city-id",
			name: "São Paulo",
			stateId: "fake-state-id",
			areaId: "fake-area-id",
		});
	});

	it("should be able to register company address", async () => {
		const { address } = await sut.execute({
			userId: "fake-user-id",
			stateAcronym: "SP",
			cityName: "São Paulo",
			street: "fake street name",
			neighborhood: "fake neighborhood",
			number: 200,
			zipCode: "00000-000",
		});

		expect(address.id).toEqual(expect.any(String));
		expect(address.cityId).toEqual("fake-city-id");
		expect(companiesRepository.items[0].addressId).toEqual(address.id);
	});
});
