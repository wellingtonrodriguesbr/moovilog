import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { IDriver, IDriverType } from "@/interfaces/driver";
import { NotAllowedError } from "./errors/not-allowed-error";

interface RegisterDriverUseCaseRequest {
	name: string;
	documentNumber: string;
	phone: string;
	type: IDriverType;
	creatorId: string;
}
interface RegisterDriverUseCaseResponse {
	driver: IDriver;
}

export class RegisterDriverUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private driversRepository: DriversRepository
	) {}

	async execute({
		name,
		documentNumber,
		phone,
		type,
		creatorId,
	}: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(creatorId);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.role !== "ADMIN" && member.role !== "MANAGER") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const driverAlreadyExistsInCompany =
			await this.driversRepository.findDriverInCompany(
				documentNumber,
				member.companyId
			);

		if (driverAlreadyExistsInCompany) {
			throw new DriverAlreadyExistsError();
		}

		const driver = await this.driversRepository.create({
			name,
			documentNumber,
			phone,
			type,
			companyId: member.companyId,
			creatorId: member.id,
		});

		return {
			driver,
		};
	}
}
