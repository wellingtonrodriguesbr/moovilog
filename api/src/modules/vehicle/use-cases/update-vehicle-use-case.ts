import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { VehicleAlreadyExistsInCompanyError } from "@/modules/vehicle/use-cases/errors/vehicle-already-exists-in-company-error";
import {
	IVehicleBody,
	IVehicleCategory,
	IVehicleType,
} from "@/modules/vehicle/interfaces/vehicle";
import { PermissionService } from "@/services/permission-service";

interface UpdateVehicleUseCaseRequest {
	plate?: string;
	trailerPlate?: string;
	year?: number;
	category?: IVehicleCategory;
	type?: IVehicleType;
	body?: IVehicleBody;
	fullLoadCapacity?: number;
	brand?: string;
	model?: string;
	userId: string;
	vehicleId: string;
}

type UpdateVehicleUseCaseResponse = void;

export class UpdateVehicleUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private vehiclesRepository: VehiclesRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		plate,
		trailerPlate,
		year,
		category,
		type,
		body,
		fullLoadCapacity,
		brand,
		model,
		userId,
		vehicleId,
	}: UpdateVehicleUseCaseRequest): Promise<UpdateVehicleUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		const hasPermission = await this.permissionService.hasPermission(
			member.id,
			["SUPER_ADMIN", "ADMIN", "MANAGE_VEHICLES_AND_DRIVERS"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const vehicle = await this.vehiclesRepository.findById(vehicleId);

		if (!vehicle) {
			throw new ResourceNotFoundError("Vehicle not found");
		}

		const transformedPlate = plate?.toUpperCase();

		if (transformedPlate && transformedPlate !== vehicle.plate) {
			const vehicleAlreadyExistsInCompanyWithPlate =
				await this.vehiclesRepository.findVehicleInCompanyByPlate(
					transformedPlate,
					member.companyId
				);

			if (vehicleAlreadyExistsInCompanyWithPlate) {
				throw new VehicleAlreadyExistsInCompanyError(
					"There is already a vehicle with this plate"
				);
			}
		}

		const transformedTrailerPlate = trailerPlate?.toUpperCase();

		if (
			transformedTrailerPlate &&
			transformedTrailerPlate !== vehicle.trailerPlate
		) {
			const vehicleAlreadyExistsInCompanyWithTrailerPlate =
				await this.vehiclesRepository.findVehicleInCompanyByTrailerPlate(
					transformedTrailerPlate,
					member.companyId
				);

			if (vehicleAlreadyExistsInCompanyWithTrailerPlate) {
				throw new VehicleAlreadyExistsInCompanyError(
					"There is already a vehicle with this trailer plate"
				);
			}
		}

		await this.vehiclesRepository.update(vehicleId, {
			plate: transformedPlate,
			trailerPlate: transformedTrailerPlate ? transformedTrailerPlate : null,
			year,
			body,
			category,
			fullLoadCapacity,
			brand,
			model,
			type,
		});
	}
}
