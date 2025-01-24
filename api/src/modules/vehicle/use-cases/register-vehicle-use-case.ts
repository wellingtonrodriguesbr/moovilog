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
} from "@/modules/shared/interfaces/vehicle";

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

const ROLE_PERMISSIONS = ["ADMIN", "MANAGER"];

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

		if (!ROLE_PERMISSIONS.includes(member.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const transformedPlate = plate.toUpperCase();

		const vehicleAlreadyExistsInCompany =
			await this.vehiclesRepository.findVehicleInCompany(
				transformedPlate,
				member.companyId
			);

		if (vehicleAlreadyExistsInCompany) {
			throw new VehicleAlreadyExistsInCompanyError(
				"There is already a vehicle registered with this plate"
			);
		}

		const vehicle = await this.vehiclesRepository.create({
			plate: transformedPlate,
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
