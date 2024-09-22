import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { FreightInformationRepository } from "@/repositories/freight-information-repository";
import { IFreightInformation } from "@/interfaces/freight-information";
import { FreightsRepository } from "@/repositories/freights-repository";
import { NotAllowedError } from "./errors/not-allowed-error";

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
		private freightsRepository: FreightsRepository,
		private freightsInformationRepository: FreightInformationRepository
	) {}

	async execute({
		driverId,
		freightId,
	}: GetFreightInformationAsADriverUseCaseRequest): Promise<GetFreightInformationAsADriverUseCaseResponse> {
		const driver = await this.driversRepsoitory.findById(driverId);

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		const freight = await this.freightsRepository.findById(freightId);

		if (!freight) {
			throw new ResourceNotFoundError("Freight not found");
		}

		if (freight.driverId !== driver.id) {
			throw new NotAllowedError();
		}

		const freightInformation =
			await this.freightsInformationRepository.findByFreight(freightId);

		if (!freightInformation) {
			throw new ResourceNotFoundError("Freight information not found");
		}

		return { freightInformation };
	}
}
