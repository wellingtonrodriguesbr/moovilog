import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";
import { ICity } from "@/modules/shared/interfaces/city";
import { IState } from "@/modules/shared/interfaces/state";
import { IAddress } from "@/modules/shared/interfaces/address";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

interface GetCompanyAddressUseCaseRequest {
  userId: string;
  companyId: string;
}

interface GetCompanyAddressUseCaseResponse {
  companyAddress: {
    address: IAddress;
    city: ICity;
    state: IState;
  };
}

export class GetCompanyAddressUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private companiesRepository: CompaniesRepository,
    private addressesRepository: AddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository
  ) {}

  async execute({ userId, companyId }: GetCompanyAddressUseCaseRequest): Promise<GetCompanyAddressUseCaseResponse> {
    const company = await this.companiesRepository.findById(companyId);

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    const memberInCompany = await this.companyMembersRepository.findMemberInCompany(userId, companyId);

    if (!memberInCompany) {
      throw new NotAllowedError("You do not have permission to perform this action");
    }

    const address = await this.addressesRepository.findById(company.addressId!);

    if (!address) {
      throw new ResourceNotFoundError("Address not found");
    }

    const city = await this.citiesRepository.findById(address.cityId);

    if (!city) {
      throw new ResourceNotFoundError("City not found");
    }

    const state = await this.statesRepository.findById(city.stateId);

    if (!state) {
      throw new ResourceNotFoundError("State not found");
    }

    const companyAddress = {
      address,
      city,
      state,
    };

    return { companyAddress };
  }
}
