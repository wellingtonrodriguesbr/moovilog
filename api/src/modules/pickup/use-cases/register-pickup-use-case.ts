import { IPickup, IPickupPriority } from "@/modules/pickup/interfaces/pickup";
import { IFreight } from "@/modules/freight/interfaces/freight";
import { PickupsRepository } from "@/modules/pickup/repositories/pickups-repository";
import { PickupHistoriesRepository } from "@/modules/pickup/repositories/pickup-histories-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { FreightsRepository } from "@/modules/freight/repositories/freights-repository";
import { AddressesRepository } from "@/modules/shared/repositories/addresses-repository";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { TransactionService } from "@/services/transaction-service";
import { PermissionService } from "@/services/permission-service";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import dayjs from "dayjs";

interface RegisterPickupUseCaseRequest {
  pickupNumber: string;
  senderName: string;
  recipientName: string;
  weight: number;
  volumeQuantity: number;
  cubage?: number | null;
  priority: IPickupPriority;
  observation?: string | null;
  requestedAt: Date;
  scheduledDate: Date;
  cityName: string;
  stateAcronym: string;
  addressZipCode: string;
  addressStreet: string;
  addressNeighborhood: string;
  addressNumber: number;
  addressComplement?: string | null;
  userId: string;
  companyId: string;
  driverId: string;
  vehicleId: string;
  freightId?: string | null;
}

interface RegisterPickupUseCaseResponse {
  pickup: IPickup;
}

export class RegisterPickupUseCase {
  constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private companiesRepository: CompaniesRepository,
    private freightsRepository: FreightsRepository,
    private addressesRepository: AddressesRepository,
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
    private driversRepository: DriversRepository,
    private vehiclesRepository: VehiclesRepository,
    private pickupsRepository: PickupsRepository,
    private pickupHistoriesRepository: PickupHistoriesRepository,
    private permissionService: PermissionService,
    private transactionService: TransactionService
  ) {}

  async execute({
    pickupNumber,
    senderName,
    recipientName,
    priority,
    observation,
    volumeQuantity,
    weight,
    cubage,
    scheduledDate,
    requestedAt,
    userId,
    companyId,
    driverId,
    vehicleId,
    freightId,
    cityName,
    stateAcronym,
    addressZipCode,
    addressStreet,
    addressNeighborhood,
    addressNumber,
    addressComplement,
  }: RegisterPickupUseCaseRequest): Promise<RegisterPickupUseCaseResponse> {
    const [memberInCompany, driver, vehicle, company] = await Promise.all([
      this.companyMembersRepository.findMemberInCompany(userId, companyId),
      this.driversRepository.findById(driverId),
      this.vehiclesRepository.findById(vehicleId),
      this.companiesRepository.findById(companyId),
    ]);

    if (!memberInCompany) {
      throw new ResourceNotFoundError("Member not found");
    }

    const hasPermission = await this.permissionService.hasPermission(memberInCompany.id, [
      "SUPER_ADMIN",
      "ADMIN",
      "MANAGE_SHIPMENTS_AND_PICKUPS",
    ]);

    if (!hasPermission) {
      throw new NotAllowedError("You do not have permission to perform this action");
    }

    if (!driver) {
      throw new ResourceNotFoundError("Driver not found");
    }

    if (!vehicle) {
      throw new ResourceNotFoundError("Vehicle not found");
    }

    if (!company) {
      throw new ResourceNotFoundError("Company not found");
    }

    let freight: IFreight | null = null;

    if (freightId) {
      freight = await this.freightsRepository.findById(freightId);

      if (!freight) {
        throw new ResourceNotFoundError("Freight not found");
      }
    }

    const state = await this.statesRepository.findByAcronym(stateAcronym);

    if (!state) {
      throw new ResourceNotFoundError("State not found");
    }

    if (dayjs(scheduledDate).isBefore(dayjs())) {
      throw new BadRequestError("Scheduled date cannot be in the past");
    }

    const pickup = await this.transactionService.executeTransaction(async (tx) => {
      const city = await this.citiesRepository.findOrCreateByNameAndStateId(cityName, state.id, tx);

      const address = await this.addressesRepository.create(
        {
          zipCode: addressZipCode,
          street: addressStreet,
          neighborhood: addressNeighborhood,
          number: addressNumber,
          complement: addressComplement ?? null,
          cityId: city.id,
        },
        tx
      );

      const createdPickup = await this.pickupsRepository.create(
        {
          pickupNumber,
          senderName,
          recipientName,
          weight,
          volumeQuantity,
          cubage,
          priority,
          observation: observation ?? null,
          requestedAt,
          scheduledDate,
          companyId,
          driverId,
          vehicleId,
          creatorId: memberInCompany.id,
          freightId: freight ? freight.id : null,
          addressId: address.id,
        },
        tx
      );

      await this.pickupHistoriesRepository.create(
        {
          pickupId: createdPickup.id,
          creatorId: memberInCompany.id,
          status: createdPickup.status,
          driverId,
          vehicleId,
          observation: observation ?? null,
          attemptDate: createdPickup.scheduledDate,
        },
        tx
      );

      return createdPickup;
    });

    return { pickup };
  }
}
