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
import { DriverTransactionsRepository } from "@/modules/financial/repositories/driver-transactions-repository";
import { PermissionService } from "@/services/permission-service";
import { TransactionService } from "@/services/transaction-service";
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

export class RegisterFreightUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository,
		private vehiclesRepository: VehiclesRepository,
		private freightsRepository: FreightsRepository,
		private freightTransactionsRepository: FreightTransactionsRepository,
		private driverTransactionsRepository: DriverTransactionsRepository,
		private routesRepository: RoutesRepository,
		private financeTransactionsRepository: FinanceTransactionsRepository,
		private financeCategoriesRepository: FinanceCategoriesRepository,
		private permissionService: PermissionService,
		private transactionService: TransactionService
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

		const hasPermission = await this.permissionService.hasPermission(
			member.id,
			["SUPER_ADMIN", "ADMIN", "MANAGE_SHIPMENTS_AND_PICKUPS"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
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

		const freight = await this.transactionService.executeTransaction(
			async (tx) => {
				const createdFreight = await this.freightsRepository.create(
					{
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
					},
					tx
				);

				// Here it is stuck on this name, because until now, to register a freight, this is the ideal category. This may change in the future.
				const financeCategory =
					await this.financeCategoriesRepository.findByName(
						"Coletas e Entregas"
					);

				if (!financeCategory) {
					throw new ResourceNotFoundError("Finance category not found");
				}

				const financeTransaction =
					await this.financeTransactionsRepository.create(
						{
							amountInCents: freightAmountInCents,
							description: `Referente ao frete com o id: ${createdFreight.id}, porgramado para o dia ${date} na rota ${route.name}.`,
							dueDate: paymentDate,
							creatorId: member.id,
							categoryId: financeCategory.id,
							companyId: member.companyId,
							status: "PENDING",
							type: "EXPENSE",
							paymentMethod: "PIX",
						},
						tx
					);

				await this.freightTransactionsRepository.create(
					{
						freightId: createdFreight.id,
						financeTransactionId: financeTransaction.id,
					},
					tx
				);

				await this.driverTransactionsRepository.create(
					{
						driverId: driver.id,
						financeTransactionId: financeTransaction.id,
					},
					tx
				);

				return createdFreight;
			}
		);

		return { freight };
	}
}
