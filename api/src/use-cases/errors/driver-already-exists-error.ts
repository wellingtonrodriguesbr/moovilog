export class DriverAlreadyExistsError extends Error {
	constructor(message?: string) {
		super(
			message ??
				"There is already a driver with this document number or telephone number"
		);
	}
}
