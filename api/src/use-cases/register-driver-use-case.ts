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
	companyMemberId: string;
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
		companyMemberId,
	}: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
		const [member, driverAlreadyExists] = await Promise.all([
			await this.companyMembersRepository.findById(companyMemberId),
			await this.driversRepository.findByDocumentNumber(documentNumber),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.role !== "ADMIN" && member.role !== "MANAGER") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		if (driverAlreadyExists) {
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
