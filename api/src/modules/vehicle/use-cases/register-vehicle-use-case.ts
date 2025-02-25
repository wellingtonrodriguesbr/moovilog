import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { VehicleAlreadyExistsInCompanyError } from "@/modules/vehicle/use-cases/errors/vehicle-already-exists-in-company-error";
import {
	IVehicle,
	IVehicleBody,
	IVehicleCategory,
	IVehicleType,
} from "@/modules/vehicle/interfaces/vehicle";
import { PermissionService } from "@/services/permission-service";

interface RegisterVehicleUseCaseRequest {
	plate: string;
	trailerPlate?: string | null;
	year: number;
	category: IVehicleCategory;
	type: IVehicleType;
	body: IVehicleBody;
	fullLoadCapacity: number;
	brand: string;
	model: string;
	userId: string;
}

interface RegisterVehicleUseCaseResponse {
	vehicle: IVehicle;
}

export class RegisterVehicleUseCase {
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
	}: RegisterVehicleUseCaseRequest): Promise<RegisterVehicleUseCaseResponse> {
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

		const transformedPlate = plate.toUpperCase();
		const transformedTrailerPlate = trailerPlate?.toUpperCase();

		const vehicleAlreadyExistsInCompanyWithPlate =
			await this.vehiclesRepository.findVehicleInCompanyByPlate(
				transformedPlate,
				member.companyId
			);

		if (vehicleAlreadyExistsInCompanyWithPlate) {
			throw new VehicleAlreadyExistsInCompanyError(
				"There is already a vehicle registered with this plate"
			);
		}

		if (transformedTrailerPlate) {
			const vehicleAlreadyExistsInCompanyWithTrailerPlate =
				await this.vehiclesRepository.findVehicleInCompanyByTrailerPlate(
					transformedTrailerPlate,
					member.companyId
				);

			if (vehicleAlreadyExistsInCompanyWithTrailerPlate) {
				throw new VehicleAlreadyExistsInCompanyError(
					"There is already a vehicle registered with this trailer plate"
				);
			}
		}

		const vehicle = await this.vehiclesRepository.create({
			plate: transformedPlate,
			trailerPlate: transformedTrailerPlate ? transformedTrailerPlate : null,
			year,
			body,
			category,
			fullLoadCapacity,
			brand,
			model,
			type,
			creatorId: member.id,
			companyId: member.companyId,
		});

		return { vehicle };
	}
}
