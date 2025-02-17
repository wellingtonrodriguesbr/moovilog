import {
	IPickup,
	INonPickupReason,
	IPickupPriority,
	IPickupStatus,
} from "@/modules/pickup/interfaces/pickup";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";

interface RegisterPickupUseCaseRequest {
	pickupNumber: string;
	senderName: string;
	recipientName: string;
	status: IPickupStatus;
	priority: IPickupPriority;
	nonPickupReason?: INonPickupReason | null;
	observation?: string | null;
	volumeQuantity: number;
	weight: number;
	cubage?: number | null;
	collectedAt: Date;
	scheduledDate: Date;
	requestedAt: Date;
	userId: string;
	companyId: string;
	assignedDriverId: string;
	freightId: string;
}

interface RegisterPickupUseCaseResponse {
	pickup: IPickup;
}

const ROLE_PERMISSIONS = ["OPERATIONAL", "MANAGER", "ADMIN"];

export class RegisterPickupUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private freightsRepository: FreightsRepository,
		private addressesRepository: AddressesRepository,
		private driversRepository: DriversRepository,
		private pickupsRepository: PickupsRepository
	) {}

	async execute({
		pickupNumber,
		senderName,
		recipientName,
		status,
		priority,
		nonPickupReason,
		observation,
		volumeQuantity,
		weight,
		cubage,
		collectedAt,
		scheduledDate,
		requestedAt,
		userId,
		companyId,
		assignedDriverId,
		freightId,
	}: RegisterPickupUseCaseRequest): Promise<RegisterPickupUseCaseResponse> {
		const [memberInCompany, driver, company, freight] = await Promise.all([
			this.companyMembersRepository.findMemberInCompany(userId, companyId),
			this.driversRepository.findById(assignedDriverId),
			this.companiesRepository.findById(companyId),
			this.freightsRepository.findById(freightId),
		]);

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (!ROLE_PERMISSIONS.includes(memberInCompany.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		if (!driver) {
			throw new ResourceNotFoundError("Driver not found");
		}

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (freightId && !freight) {
			throw new ResourceNotFoundError("Freight not found");
		}

		const pickup = await this.pickupsRepository.create({
			date,
			modality,
			type,
			pickupsQuantity,
			deliveriesQuantity,
			totalWeightOfPickups,
			totalWeightOfDeliveries,
			pickupAmountInCents,
			observation,
			driverId: driver.id,
			creatorId: member.id,
			companyId: member.companyId,
			routeId: route.id,
			vehicleId: vehicle.id,
		});

		// Here it is stuck on this name, because until now, to register a pickup, this is the ideal category. This may change in the future.
		const financeCategory =
			await this.financeCategoriesRepository.findByName("Coletas e Entregas");

		if (!financeCategory) {
			throw new ResourceNotFoundError("Finance category not found");
		}

		await this.financeTransactionsRepository.create({
			amountInCents: pickupAmountInCents,
			description: `Referente ao frete com o id: ${pickup.id}`,
			dueDate: paymentDate,
			creatorId: member.id,
			categoryId: financeCategory.id,
			companyId: member.companyId,
			status: "PENDING",
			type: "EXPENSE",
			paymentMethod: "PIX",
		});

		return { pickup };
	}
}
