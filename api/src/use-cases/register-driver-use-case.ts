import { hash } from "bcryptjs";
import { DriverAlreadyExistsError } from "./errors/driver-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { IDriver } from "@/interfaces/driver";
import { NotAllowedError } from "./errors/not-allowed-error";

interface RegisterDriverUseCaseRequest {
  name: string;
  password: string;
  documentNumber: string;
  phone: string;
  backupPhone?: string | null;
  creatorId: string;
}
interface RegisterDriverUseCaseResponse {
  driver: IDriver;
}

export class RegisterDriverUseCase {
	constructor(
    private companyMembersRepository: CompanyMembersRepository,
    private driversRepository: DriversRepository,
	) {}

	async execute({
		name,
		password,
		documentNumber,
		phone,
		backupPhone,
		creatorId,
	}: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
		const [member, driverAlreadyExists] = await Promise.all([
			await this.companyMembersRepository.findByMemberId(creatorId),
			await this.driversRepository.findByDocumentNumber(documentNumber),
		]);

		if (!member) {
			throw new ResourceNotFoundError("Member not found");
		}

		if (member.role !== "ADMIN" && member.role !== "OPERATIONAL") {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access",
			);
		}

		if (driverAlreadyExists) {
			throw new DriverAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const driver = await this.driversRepository.create({
			name,
			password: passwordHash,
			documentNumber,
			phone,
			backupPhone,
			companyId: member.companyId,
			creatorId: member.memberId,
		});

		return {
			driver,
		};
	}
}
