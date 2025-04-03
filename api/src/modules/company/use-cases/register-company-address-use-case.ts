import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { IAddress } from "@/modules/shared/interfaces/address";
import { STATES } from "@/utils/mocks/states";
import { UsersRepository } from "@/modules/user/repositories/users-repository";

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

export class RegisterCompanyAddressUseCase {
	constructor(
		private addressesRepository: AddressesRepository,
		private citiesRepository: CitiesRepository,
		private statesRepository: StatesRepository,
		private companiesRepository: CompaniesRepository,
		private usersRepository: UsersRepository
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
			stateAcronym.toUpperCase()
		);

		if (!state) {
			throw new ResourceNotFoundError("State not found");
		}

		const [city, company] = await Promise.all([
			await this.citiesRepository.findOrCreateByNameAndStateId(
				cityName,
				state.id
			),
			await this.companiesRepository.findByOwnerId(userId),
		]);

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
		this.usersRepository.updateExtraData(userId, "complete_onboarding");

		return { address };
	}
}
