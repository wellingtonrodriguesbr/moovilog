import {
	IFreight,
	IFreightModality,
	IFreightTypes,
} from "@/modules/shared/interfaces/freight";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { transformToCents } from "@/utils/transform-to-cents";

import dayjs from "dayjs";

interface RegisterFreightUseCaseRequest {
	type: IFreightTypes;
	date: Date;
	modality: IFreightModality;
	observation?: string | null;
	pickupsQuantity?: number;
	deliveriesQuantity: number;
	totalWeightOfPickups?: number;
	totalWeightOfDeliveries: number;
	freightAmountInCents: number;
	companyMemberId: string;
	driverId: string;
	vehicleId: string;
	routeId: string;
}

interface RegisterFreightUseCaseResponse {
	freight: IFreight;
}

const ALLOWED_ROLES_TO_REGISTER_FREIGHT = ["OPERATIONAL", "MANAGER", "ADMIN"];

export class RegisterFreightUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository,
		private vehiclesRepository: VehiclesRepository,
		private freightsRepository: FreightsRepository,
		private routesRepository: RoutesRepository
	) {}

	async execute({
		type,
		date,
		modality,
		observation,
		pickupsQuantity,
		deliveriesQuantity,
		totalWeightOfPickups,
		totalWeightOfDeliveries,
		freightAmountInCents,
		companyMemberId,
		driverId,
		vehicleId,
		routeId,
	}: RegisterFreightUseCaseRequest): Promise<RegisterFreightUseCaseResponse> {
		const [member, driver, vehicle, route] = await Promise.all([
			await this.companyMembersRepository.findById(companyMemberId),
			await this.driversRepository.findById(driverId),
			await this.vehiclesRepository.findById(vehicleId),
			await this.routesRepository.findById(routeId),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!ALLOWED_ROLES_TO_REGISTER_FREIGHT.includes(member.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		if (!vehicle) {
			throw new ResourceNotFoundError("Vehicle not found");
		}

		if (!route) {
			throw new ResourceNotFoundError("Route not found");
		}

		if (dayjs(date).isBefore(new Date(), "day")) {
			throw new BadRequestError("Invalid freight date");
		}

		const transformedFreightAmountInCents =
			transformToCents(freightAmountInCents);

		const freight = await this.freightsRepository.create({
			date,
			modality,
			type,
			pickupsQuantity,
			deliveriesQuantity,
			totalWeightOfPickups,
			totalWeightOfDeliveries,
			freightAmountInCents: transformedFreightAmountInCents,
			observation,
			driverId: driver.id,
			creatorId: member.id,
			companyId: member.companyId,
			routeId: route.id,
			vehicleId: vehicle.id,
		});

		return { freight };
	}
}
