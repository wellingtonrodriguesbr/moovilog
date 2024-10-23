import { IFreight, IFreightTypes } from "@/interfaces/freight";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { FreightsRepository } from "@/repositories/freights-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { CitiesByFreightRepository } from "@/repositories/cities-by-freight-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { BadRequestError } from "./errors/bad-request-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

import dayjs from "dayjs";

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
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository,
		private freightsRepository: FreightsRepository,
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
		const [member, driver] = await Promise.all([
			await this.companyMembersRepository.findByUserId(creatorId),
			await this.driversRepository.findById(driverId),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.role !== "ADMIN" && member.role !== "OPERATIONAL") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		if (dayjs(date).isBefore(new Date(), "day")) {
			throw new BadRequestError("Invalid freight date");
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
			creatorId: member.memberId,
			companyId: member.companyId,
		});

		await Promise.all([
			await this.citiesByFreightRepository.createMany({
				freightId: freight.id,
				citiesIds,
			}),
		]);

		return { freight };
	}
}
