import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { CompanyAddressesRepository } from "@/repositories/company-addresses-repository";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { CitiesRepository } from "@/repositories/cities-repository";
import { StatesRepository } from "@/repositories/states-repository";
import { ICompany } from "@/interfaces/company";
import { ICity } from "@/interfaces/city";
import { IState } from "@/interfaces/state";

interface GetCompanyInformationUseCaseRequest {
  userId: string;
}

export interface Address {
  id: string;
  zipCode: string;
  street: string;
  neighborhood: string;
  number: number;
  complement: string | null;
  cityId: string;
}

interface GetCompanyInformationUseCaseResponse {
  company: ICompany;
  companyAddress: {
    address: Address;
    city: ICity;
    state: IState;
  };
}

export class GetCompanyInformationUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private companiesRepository: CompaniesRepository,
    private companyAddressesRepository: CompanyAddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository
  ) {}

  async execute({
    userId,
  }: GetCompanyInformationUseCaseRequest): Promise<GetCompanyInformationUseCaseResponse> {
    const member = await this.companyMembersRepository.findById(userId);

    if (!member) {
      throw new ResourceNotFoundError("Member not found");
    }

    const company = await this.companiesRepository.findByCompanyMemberId(
      member.id
    );

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    const companyAddress =
      await this.companyAddressesRepository.findByCompanyId(company.id);

    if (!companyAddress) {
      throw new ResourceNotFoundError("Company address not found");
    }

    const cityAddress = await this.citiesRepository.findById(
      companyAddress.cityId
    );

    if (!cityAddress) {
      throw new ResourceNotFoundError("City not found");
    }

    const state = await this.statesRepository.findByCityId(cityAddress.id);

    if (!state) {
      throw new ResourceNotFoundError("State not found");
    }

    const companyInformation = {
      company,
      companyAddress: {
        address: companyAddress,
        city: cityAddress,
        state,
      },
    };

    return { ...companyInformation };
  }
}
