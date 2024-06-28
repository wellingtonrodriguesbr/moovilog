import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { DriversRepository } from "@/repositories/drivers-repository";
import { VehiclesRepository } from "@/repositories/vehicles-repository";

interface RegisterVehicleUseCaseRequest {
  plate: string;
  year: number;
  category:
    | "UTILITY"
    | "VAN"
    | "LIGHT_TRUCKS"
    | "STRAIGHT_TRUCKS"
    | "TRUCKS"
    | "QUAD_AXLE_TRUCKS"
    | "SEMI_TRAILER"
    | "TANDEM_AXLE_TRUCK";
  type: "OWN" | "OUTSOURCED" | "RENTED";
  body: "CLOSED" | "OPEN" | "SIDER" | "REFRIGERATED" | "BUCKET";
  fullLoadCapacity: string;
  driverId: string;
  creatorId: string;
}

interface Vehicle {
  id: string;
  plate: string;
  year: number;
  category:
    | "UTILITY"
    | "VAN"
    | "LIGHT_TRUCKS"
    | "STRAIGHT_TRUCKS"
    | "TRUCKS"
    | "QUAD_AXLE_TRUCKS"
    | "SEMI_TRAILER"
    | "TANDEM_AXLE_TRUCK";
  type: "OWN" | "OUTSOURCED" | "RENTED";
  body: "CLOSED" | "OPEN" | "SIDER" | "REFRIGERATED" | "BUCKET";
  fullLoadCapacity: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RegisterVehicleUseCaseResponse {
  vehicle: Vehicle;
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

    if (user?.role !== "ADMIN" && user?.role !== "OPERATIONAL") {
      throw new UnauthorizedError(
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
