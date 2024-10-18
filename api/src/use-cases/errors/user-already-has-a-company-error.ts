export class UserAlreadyHasACompanyError extends Error {
	constructor(message?: string) {
		super(message ?? "User already has a company");
	}
}
