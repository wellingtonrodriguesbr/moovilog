import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { IAddress } from "@/interfaces/address";
import { AddressesRepository } from "@/repositories/addresses-repository";
import { StatesRepository } from "@/repositories/states-repository";

interface RegisterCompanyAddressUseCaseRequest {
	stateName: string;
	stateAcronym: string;
	cityName: string;
	street: string;
	neighborhood: string;
	number: number;
	complement?: string | null;
	zipCode: string;
	userId: string;
}

interface RegisterCompanyAddressUseCaseResponse {
	address: IAddress;
}

export class RegisterCompanyAddressUseCase {
	constructor(
		private addressesRepository: AddressesRepository,
		private citiesRepository: CitiesRepository,
		private statesRepository: StatesRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		stateName,
		stateAcronym,
		cityName,
		street,
		neighborhood,
		number,
		zipCode,
		complement,
		userId,
	}: RegisterCompanyAddressUseCaseRequest): Promise<RegisterCompanyAddressUseCaseResponse> {
		const state = await this.statesRepository.findByNameAndAcronym(
			stateName,
			stateAcronym
		);

		if (!state) {
			throw new ResourceNotFoundError("State not found");
		}

		const [city, company] = await Promise.all([
			await this.citiesRepository.findByNameAndState(cityName, state.id),
			await this.companiesRepository.findByOwnerId(userId),
		]);

		if (!city) {
			throw new ResourceNotFoundError("City not found");
		}

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		const address = await this.addressesRepository.create({
			street,
			number,
			neighborhood,
			zipCode,
			complement,
			cityId: city.id,
		});

		this.companiesRepository.setCompanyAddress(company.id, address.id);

		return { address };
	}
}
