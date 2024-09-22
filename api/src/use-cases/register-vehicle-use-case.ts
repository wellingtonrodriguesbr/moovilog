import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { VehiclesRepository } from "@/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import {
	IVehicle,
	IVehicleBody,
	IVehicleCategory,
	IVehicleType,
} from "@/interfaces/vehicle";

interface RegisterVehicleUseCaseRequest {
	plate: string;
	year: number;
	category: IVehicleCategory;
	type: IVehicleType;
	body: IVehicleBody;
	fullLoadCapacity: string;
	driverId: string;
	creatorId: string;
}

interface RegisterVehicleUseCaseResponse {
	vehicle: IVehicle;
}

export class RegisterVehicleUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository,
		private vehiclesRepository: VehiclesRepository
	) {}

	async execute({
		plate,
		year,
		category,
		type,
		body,
		fullLoadCapacity,
		driverId,
		creatorId,
	}: RegisterVehicleUseCaseRequest): Promise<RegisterVehicleUseCaseResponse> {
		const [member, driver, vehicleAlreadyExists] = await Promise.all([
			await this.companyMembersRepository.findByMemberId(creatorId),
			await this.driversRepository.findById(driverId),
			await this.vehiclesRepository.findByPlate(plate),
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

		if (vehicleAlreadyExists) {
			throw new VehicleAlreadyExistsError(
				"There is already a vehicle registered with this plate"
			);
		}

		const vehicle = await this.vehiclesRepository.create({
			plate,
			year,
			body,
			category,
			fullLoadCapacity,
			type,
			driverId,
		});

		return { vehicle };
	}
}
