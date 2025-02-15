import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { IDriver, IDriverType } from "@/modules/driver/interfaces/driver";
import { DriverAlreadyExistsError } from "@/modules/driver/use-cases/errors/driver-already-exists-error";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

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
