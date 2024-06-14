import { prisma } from "../lib/prisma";
import {
  Vehicle,
  VehicleBody,
  VehicleCategory,
  VehicleType,
} from "@prisma/client";
import { VehicleAlreadyExistsError } from "./errors/vehicle-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterVehicleUseCaseRequest {
  plate: string;
  category: VehicleCategory;
  type: VehicleType;
  body: VehicleBody;
  fullLoadCapacity: string;
  driverId: string;
  creatorId: string;
}

interface RegisterVehicleUseCaseResponse {
  vehicle: Vehicle;
}

export async function registerVehicleUseCase({
  plate,
  category,
  type,
  body,
  fullLoadCapacity,
  driverId,
  creatorId,
}: RegisterVehicleUseCaseRequest): Promise<RegisterVehicleUseCaseResponse> {
  const [user, vehicleAlreadyExists, driver] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    }),
    await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    }),
    await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    }),
  ]);

  if (user?.role !== ("ADMIN" || "OPERATIONAL")) {
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

  const vehicle = await prisma.vehicle.create({
    data: {
      plate,
      category,
      type,
      body,
      fullLoadCapacity,
      driverId,
    },
  });

  return { vehicle };
}
