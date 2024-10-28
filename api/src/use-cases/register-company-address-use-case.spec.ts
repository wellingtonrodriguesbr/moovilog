import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompaniesRepository } from "@/repositories/in-memory/in-memory-companies-repository";
import { RegisterCompanyAddressUseCase } from "./register-company-address-use-case";
import { InMemoryCitiesRepository } from "@/repositories/in-memory/in-memory-cities-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let citiesRepository: InMemoryCitiesRepository;
let addressesRepository: InMemoryAddressesRepository;
let sut: RegisterCompanyAddressUseCase;

describe("Register company address use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		citiesRepository = new InMemoryCitiesRepository();
		addressesRepository = new InMemoryAddressesRepository();

		sut = new RegisterCompanyAddressUseCase(
			addressesRepository,
			citiesRepository,
			companiesRepository
		);

		await usersRepository.create({
			id: "fake-user-id",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});
	});

	it("should be able to register company address", async () => {
		await companiesRepository.create({
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "fake-user-id",
		});

		const city = await citiesRepository.create({
			name: "São Paulo",
			stateId: "fake-state-id",
		});

		const { address } = await sut.execute({
			userId: "fake-user-id",
			cityName: city.name,
			street: "fake street name",
			neighborhood: "fake neighborhood",
			number: 200,
			zipCode: "00000-000",
		});

		expect(address.id).toEqual(expect.any(String));
		expect(address.cityId).toEqual(city.id);
		expect(companiesRepository.items[0].addressId).toEqual(address.id);
	});
});
