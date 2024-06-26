import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { CompanyAddressesRepository } from "@/repositories/company-addresses-repository";

interface RegisterCompanyAddressUseCaseRequest {
  cityName: string;
  street: string;
  neighborhood: string;
  number: number;
  complement?: string | null;
  zipCode: string;
  userId: string;
}

interface Address {
  id: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  number: number;
  complement: string | null;
  createdAt: Date;
  cityId: string;
}

interface RegisterCompanyAddressUseCaseResponse {
  address: Address;
}

export class RegisterCompanyAddressUseCase {
  constructor(
    private companyAddressesRepository: CompanyAddressesRepository,
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

    const address = await this.companyAddressesRepository.createCompanyAddress(
      { street, number, neighborhood, zipCode, complement, cityId: city.id },
      company.id
    );

    return { address };
  }
}
