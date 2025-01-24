export class VehicleAlreadyExistsInCompanyError extends Error {
	constructor(message?: string) {
		super(message ?? "Vehicle already exists in company");
	}
}
