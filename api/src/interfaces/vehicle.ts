import { $Enums, Vehicle } from "@prisma/client";

export interface IVehicle extends Vehicle {}

export type IVehicleCategory = $Enums.VehicleCategory;
export type IVehicleBody = $Enums.VehicleBody;
export type IVehicleType = $Enums.VehicleType;
