import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaVehiclesRepository } from "@/repositories/prisma/prisma-vehicles-repository";
import { RegisterVehicleUseCase } from "../register-vehicle-use-case";
import { PrismaDriversRepository } from "@/repositories/prisma/prisma-drivers-repository";

export function makeRegisterVehicleUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const driversRepository = new PrismaDriversRepository();
  const vehiclesRepository = new PrismaVehiclesRepository();
  const registerVehicleUseCase = new RegisterVehicleUseCase(
    usersRepository,
    driversRepository,
    vehiclesRepository
  );

  return registerVehicleUseCase;
}
