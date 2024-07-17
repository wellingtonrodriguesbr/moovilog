import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { FreightInformationRepository } from "@/repositories/freight-information-repository";
import { IFreightInformation } from "@/interfaces/freight-information";

interface GetFreightInformationAsADriverUseCaseRequest {
  driverId: string;
  freightId: string;
}

interface GetFreightInformationAsADriverUseCaseResponse {
  freightInformation: IFreightInformation;
}

export class GetFreightInformationAsADriverUseCase {
  constructor(
    private driversRepsoitory: DriversRepository,
    private freightsInformationRepository: FreightInformationRepository
  ) {}

  async execute({
    driverId,
    freightId,
  }: GetFreightInformationAsADriverUseCaseRequest): Promise<GetFreightInformationAsADriverUseCaseResponse> {
    const driver = await this.driversRepsoitory.findById(driverId);
    const freightInformation =
      await this.freightsInformationRepository.findByFreight(freightId);

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
    }

    if (!freightInformation) {
      throw new ResourceNotFoundError("Freight information not found");
    }

    return { freightInformation };
  }
}
