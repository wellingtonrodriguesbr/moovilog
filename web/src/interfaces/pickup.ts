export interface Pickup {
  id: string;
  pickupNumber: string;
  senderName: string;
  recipientName: string;
  weight: string;
  volumeQuantity: number;
  cubage: string;
  status: "PENDING" | "IN_ROUTE" | "COLLECTED" | "CANCELED";
  priority: "NORMAL" | "URGENT";
  observation: string | null;
  requestedAt: Date;
  scheduledDate: Date;
  collectedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  freightId: string | null;
  companyId: string;
  creatorId: string;
  driverId: string;
  vehicleId: string;
  addressId: string;
}
