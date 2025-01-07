import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
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
		private vehiclesRepository: VehiclesRepository
	) {}

	async execute({
		plate,
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

		if (member.role !== "ADMIN" && member.role !== "MANAGER") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const vehicleAlreadyExistsInCompany =
			await this.vehiclesRepository.findVehicleInCompany(
				plate,
				member.companyId
			);

		if (vehicleAlreadyExistsInCompany) {
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
			brand,
			model,
			type,
			creatorId: member.id,
			companyId: member.companyId,
		});

		return { vehicle };
	}
}
