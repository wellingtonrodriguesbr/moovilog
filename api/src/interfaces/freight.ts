import { $Enums, Freight } from "@prisma/client";

export interface IFreight extends Freight {}

export type IFreightTypes = $Enums.FreightType;
