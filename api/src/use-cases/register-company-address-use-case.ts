import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { IAddress } from "@/interfaces/address";
import { AddressesRepository } from "@/repositories/addresses-repository";
import { StatesRepository } from "@/repositories/states-repository";

interface RegisterCompanyAddressUseCaseRequest {
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

const STATES: Record<string, string> = {
	AC: "Acre",
	AL: "Alagoas",
	AP: "Amapá",
	AM: "Amazonas",
	BA: "Bahia",
	CE: "Ceará",
	DF: "Distrito Federal",
	ES: "Espírito Santo",
	GO: "Goiás",
	MA: "Maranhão",
	MT: "Mato Grosso",
	MS: "Mato Grosso do Sul",
	MG: "Minas Gerais",
	PA: "Pará",
	PB: "Paraíba",
	PR: "Paraná",
	PE: "Pernambuco",
	PI: "Piauí",
	RJ: "Rio de Janeiro",
	RN: "Rio Grande do Norte",
	RS: "Rio Grande do Sul",
	RO: "Rondônia",
	RR: "Roraima",
	SC: "Santa Catarina",
	SP: "São Paulo",
	SE: "Sergipe",
	TO: "Tocantins",
};

export class RegisterCompanyAddressUseCase {
	constructor(
		private addressesRepository: AddressesRepository,
		private citiesRepository: CitiesRepository,
		private statesRepository: StatesRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		stateAcronym,
		cityName,
		street,
		neighborhood,
		number,
		zipCode,
		complement,
		userId,
	}: RegisterCompanyAddressUseCaseRequest): Promise<RegisterCompanyAddressUseCaseResponse> {
		const stateName = STATES[stateAcronym];
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
