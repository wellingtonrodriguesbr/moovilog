import { Prisma, Vehicle, VehicleStatus } from "@prisma/client";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { randomUUID } from "node:crypto";

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = [];

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = {
      id: data.id ?? randomUUID(),
      plate: data.plate,
      trailerPlate: data.trailerPlate ?? null,
      year: data.year,
      category: data.category,
      status: data.status ?? "ACTIVE",
      type: data.type,
      body: data.body,
      fullLoadCapacity: data.fullLoadCapacity,
      brand: data.brand,
      model: data.model,
      creatorId: data.creatorId,
      companyId: data.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(vehicle);
    return vehicle;
  }

  async findVehicleInCompanyByPlate(plate: string, companyId: string) {
    const vehicle = this.items.find((item) => item.plate === plate && item.companyId === companyId);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findVehicleInCompanyByTrailerPlate(trailerPlate: string, companyId: string) {
    const vehicle = this.items.find((item) => item.trailerPlate === trailerPlate && item.companyId === companyId);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findByPlate(plate: string) {
    const vehicle = this.items.find((item) => item.plate === plate);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findById(id: string) {
    const vehicle = this.items.find((item) => item.id === id);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findVehicleInCompany(id: string, companyId: string) {
    const vehicle = this.items.find((item) => item.id === id && item.companyId === companyId);

    if (!vehicle) {
      return null;
    }

    return vehicle;
  }

  async findManyByCompanyId(companyId: string) {
    const vehicles = this.items.filter((item) => item.companyId === companyId);

    return vehicles;
  }

  async updateStatus(id: string, status: VehicleStatus) {
    const vehicleIndex = this.items.findIndex((item) => item.id === id);

    this.items[vehicleIndex].status = status;
  }

  async update(id: string, data: Prisma.VehicleUncheckedUpdateInput) {
    const vehicleIndex = this.items.findIndex((item) => item.id === id);

    if (vehicleIndex === -1) {
      return;
    }

    const updatedVehicle = {
      ...this.items[vehicleIndex],
      ...data,
    } as Vehicle;

    this.items[vehicleIndex] = updatedVehicle;
  }
}
