import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { VehiclesRepository } from "@/repositories/vehicles-repository";
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
    private usersRepository: UsersRepository,
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
    const [user, driver, vehicleAlreadyExists] = await Promise.all([
      await this.usersRepository.findById(creatorId),
      await this.driversRepository.findById(driverId),
      await this.vehiclesRepository.findByPlate(plate),
    ]);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== "ADMIN" && user.role !== "OPERATIONAL") {
      throw new NotAllowedError(
        "You do not have permission to perform this action, please ask your administrator for access"
      );
    }

    if (vehicleAlreadyExists) {
      throw new VehicleAlreadyExistsError(
        "There is already a vehicle registered with this plate"
      );
    }

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
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
