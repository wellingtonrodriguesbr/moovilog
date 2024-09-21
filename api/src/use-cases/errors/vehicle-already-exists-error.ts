export class VehicleAlreadyExistsError extends Error {
	constructor(message?: string) {
		super(message ?? "Vehicle already exists");
	}
}
