import { $Enums, Pickup } from "@prisma/client";

export type IPickup = Pickup;

export type IPickupStatus = $Enums.PickupStatus;
export type IPickupPriority = $Enums.PickupPriority;
export type INonPickupReason = $Enums.NonPickupReason;
