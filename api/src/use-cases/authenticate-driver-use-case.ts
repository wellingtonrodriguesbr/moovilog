import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { DriversRepository } from "@/repositories/drivers-repository";
import { IDriver } from "@/interfaces/driver";

interface AuthenticateDriverUseCaseRequest {
	documentNumber: string;
	password: string;
}

interface AuthenticateDriverUseCaseResponse {
	driver: IDriver;
}

export class AuthenticateDriverUseCase {
	constructor(private driversRepository: DriversRepository) {}

	async execute({
		documentNumber,
		password,
	}: AuthenticateDriverUseCaseRequest): Promise<AuthenticateDriverUseCaseResponse> {
		const driver =
			await this.driversRepository.findByDocumentNumber(documentNumber);

		if (!driver) {
			throw new InvalidCredentialsError(
				"Incorrect document number or password"
			);
		}

		const doesPasswordsMatch = await compare(password, driver.password);

		if (!doesPasswordsMatch) {
			throw new InvalidCredentialsError(
				"Incorrect document number or password"
			);
		}

		return { driver };
	}
}
