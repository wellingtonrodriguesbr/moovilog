export interface Vehicle {
  id: string;
  plate: string;
  trailerPlate: string | null;
  year: number;
  brand: string;
  model: string;
  category:
    | "UTILITY"
    | "VAN"
    | "LIGHT_TRUCKS"
    | "STRAIGHT_TRUCKS"
    | "TRUCKS"
    | "QUAD_AXLE_TRUCKS"
    | "SEMI_TRAILER"
    | "B_TRAIN"
    | "ROAD_TRAIN";
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RESERVED" | "BROKEN";
  type: "OWN" | "AGGREGATE" | "RENTED";
  body:
    | "CLOSED"
    | "OPEN"
    | "SIDER"
    | "REFRIGERATED"
    | "BUCKET"
    | "TANK"
    | "BULK_CARRIER"
    | "LIVESTOCK"
    | "FLATBED"
    | "CONTAINER"
    | "WOOD"
    | "CAR_CARRIER";
  fullLoadCapacity: number;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  creatorId: string;
}
