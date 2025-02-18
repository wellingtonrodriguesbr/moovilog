import {
	IFreight,
	IFreightModality,
	IFreightTypes,
} from "@/modules/freight/interfaces/freight";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { FreightTransactionsRepository } from "@/modules/financial/repositories/freight-transactions-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { FinanceCategoriesRepository } from "@/modules/financial/repositories/finance-categories-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import dayjs from "dayjs";

interface RegisterFreightUseCaseRequest {
	type: IFreightTypes;
	date: Date;
	paymentDate: Date;
	modality: IFreightModality;
	observation?: string | null;
	pickupsQuantity?: number;
	deliveriesQuantity: number;
	totalWeightOfPickups?: number;
	totalWeightOfDeliveries: number;
	freightAmountInCents: number;
	userId: string;
	driverId: string;
	vehicleId: string;
	routeId: string;
}

interface RegisterFreightUseCaseResponse {
	freight: IFreight;
}

const ROLE_PERMISSIONS = ["OPERATIONAL", "MANAGER", "ADMIN"];

export class RegisterFreightUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository,
		private vehiclesRepository: VehiclesRepository,
		private freightsRepository: FreightsRepository,
		private freightTransactionsRepository: FreightTransactionsRepository,
		private routesRepository: RoutesRepository,
		private financeTransactionsRepository: FinanceTransactionsRepository,
		private financeCategoriesRepository: FinanceCategoriesRepository
	) {}

	async execute({
		type,
		date,
		paymentDate,
		modality,
		observation,
		pickupsQuantity,
		deliveriesQuantity,
		totalWeightOfPickups,
		totalWeightOfDeliveries,
		freightAmountInCents,
		userId,
		driverId,
		vehicleId,
		routeId,
	}: RegisterFreightUseCaseRequest): Promise<RegisterFreightUseCaseResponse> {
		const [member, driver, vehicle, route] = await Promise.all([
			this.companyMembersRepository.findByUserId(userId),
			this.driversRepository.findById(driverId),
			this.vehiclesRepository.findById(vehicleId),
			this.routesRepository.findById(routeId),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!ROLE_PERMISSIONS.includes(member.role)) {
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

		if (dayjs(paymentDate).isBefore(new Date(), "day")) {
			throw new BadRequestError("Invalid payment date");
		}

		const freight = await this.freightsRepository.create({
			date,
			modality,
			type,
			pickupsQuantity,
			deliveriesQuantity,
			totalWeightOfPickups,
			totalWeightOfDeliveries,
			freightAmountInCents,
			observation,
			driverId: driver.id,
			creatorId: member.id,
			companyId: member.companyId,
			routeId: route.id,
			vehicleId: vehicle.id,
		});

		// Here it is stuck on this name, because until now, to register a freight, this is the ideal category. This may change in the future.
		const financeCategory =
			await this.financeCategoriesRepository.findByName("Coletas e Entregas");

		if (!financeCategory) {
			throw new ResourceNotFoundError("Finance category not found");
		}

		const financeTransaction = await this.financeTransactionsRepository.create({
			amountInCents: freightAmountInCents,
			description: `Referente ao frete com o id: ${freight.id}, porgramado para o dia ${date} na rota ${route.name}.`,
			dueDate: paymentDate,
			creatorId: member.id,
			categoryId: financeCategory.id,
			companyId: member.companyId,
			status: "PENDING",
			type: "EXPENSE",
			paymentMethod: "PIX",
		});

		await this.freightTransactionsRepository.create({
			freightId: freight.id,
			financeTransactionId: financeTransaction.id,
		});

		return { freight };
	}
}
