import { InMemoryDriversRepository } from "@/repositories/in-memory/in-memory-drivers-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { AuthenticateDriverUseCase } from "./authenticate-driver-use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let driversRepository: InMemoryDriversRepository;
let sut: AuthenticateDriverUseCase;

describe("Authenticate driver use case", () => {
	beforeEach(async () => {
		driversRepository = new InMemoryDriversRepository();
		sut = new AuthenticateDriverUseCase(driversRepository);

		await driversRepository.create({
			name: "John Doe",
			documentNumber: "12312312312",
			password: await hash("12345678", 6),
			phone: "11999999999",
			companyId: "",
			creatorId: "",
		});
	});

	it("should be able to authenticate", async () => {
		const { driver } = await sut.execute({
			documentNumber: "12312312312",
			password: "12345678",
		});

		expect(driver.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate with wrong document number", async () => {
		expect(() =>
			sut.execute({
				documentNumber: "11111111111",
				password: "12345678",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate with wrong password", async () => {
		await expect(() =>
			sut.execute({
				documentNumber: "12312312312",
				password: "11111111",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
