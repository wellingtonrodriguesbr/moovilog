import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { CompanyAddressesRepository } from "@/repositories/company-addresses-repository";
import { IAddress } from "@/interfaces/address";
import { AddressesRepository } from "@/repositories/addresses-repository";

interface RegisterCompanyAddressUseCaseRequest {
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
		private companyAddressesRepository: CompanyAddressesRepository,
		private addressesRepository: AddressesRepository,
		private citiesRepository: CitiesRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({
		cityName,
		street,
		neighborhood,
		number,
		zipCode,
		complement,
		userId,
	}: RegisterCompanyAddressUseCaseRequest): Promise<RegisterCompanyAddressUseCaseResponse> {
		const [city, company] = await Promise.all([
			await this.citiesRepository.findByName(cityName),
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

		await this.companyAddressesRepository.create({
			addressId: address.id,
			companyId: company.id,
		});

		return { address };
	}
}
