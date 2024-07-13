import { IFreight, IFreightTypes } from "@/interfaces/freight";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { UsersRepository } from "@/repositories/users-repository";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { FreightsRepository } from "@/repositories/freights-repository";
import { FreightInformationRepository } from "@/repositories/freight-information-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { FreightsByCompanyRepository } from "@/repositories/freights-by-company-repository";
import { CitiesByFreightRepository } from "@/repositories/cities-by-freight-repository";

interface RegisterFreightUseCaseRequest {
  type: IFreightTypes;
  date: Date;
  observation?: string | null;
  pickupsQuantity: number;
  deliveriesQuantity: number;
  totalWeightOfPickups: number;
  totalWeightOfDeliveries: number;
  freightAmountInCents: number;
  citiesIds: string[];
  driverId: string;
  creatorId: string;
}

interface RegisterFreightUseCaseResponse {
  freight: IFreight;
}

export class RegisterFreightUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private driversRepository: DriversRepository,
    private companiesRepository: CompaniesRepository,
    private freightsRepository: FreightsRepository,
    private freightInformationRepository: FreightInformationRepository,
    private freightsByCompanyRepository: FreightsByCompanyRepository,
    private citiesByFreightRepository: CitiesByFreightRepository
  ) {}

  async execute({
    type,
    date,
    observation,
    pickupsQuantity,
    deliveriesQuantity,
    totalWeightOfPickups,
    totalWeightOfDeliveries,
    freightAmountInCents,
    citiesIds,
    driverId,
    creatorId,
  }: RegisterFreightUseCaseRequest): Promise<RegisterFreightUseCaseResponse> {
    const user = await this.usersRepository.findById(creatorId);
    const driver = await this.driversRepository.findById(driverId);
    const company = await this.companiesRepository.findByCompanyMemberId(
      creatorId
    );

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== "ADMIN" && user.role !== "OPERATIONAL") {
      throw new UnauthorizedError(
        "You do not have permission to perform this action, please ask your administrator for access"
      );
    }

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
    }

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    const freight = await this.freightsRepository.create({
      date,
      type,
      pickupsQuantity,
      deliveriesQuantity,
      totalWeightOfPickups,
      totalWeightOfDeliveries,
      freightAmountInCents,
      observation,
      driverId: driver.id,
      creatorId: user.id,
    });

    await this.freightsByCompanyRepository.create({
      freightId: freight.id,
      companyId: company.id,
    });

    await this.freightInformationRepository.create({
      freightId: freight.id,
      initialKM: 0,
      finalKM: 0,
    });

    await this.citiesByFreightRepository.createMany({
      freightId: freight.id,
      citiesIds,
    });

    return { freight };
  }
}
