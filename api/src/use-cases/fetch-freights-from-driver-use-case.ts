import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { FreightsRepository } from "@/repositories/freights-repository";
import { IFreight } from "@/interfaces/freight";

interface FetchFreightsFromDriverUseCaseRequest {
	driverId: string;
}

interface FetchFreightsFromDriverUseCaseResponse {
	freights: IFreight[];
}

export class FetchFreightsFromDriverUseCase {
	constructor(
		private driversRepository: DriversRepository,
		private freightsRepository: FreightsRepository
	) {}

	async execute({
		driverId,
	}: FetchFreightsFromDriverUseCaseRequest): Promise<FetchFreightsFromDriverUseCaseResponse> {
		const driver = await this.driversRepository.findById(driverId);

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		const freights = await this.freightsRepository.findManyByDriverId(
			driver.id
		);

		return { freights };
	}
}
