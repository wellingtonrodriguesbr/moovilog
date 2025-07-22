export class OwnerAlreadyHasACompanyError extends Error {
  constructor(message?: string) {
    super(message ?? "Owner already has a company");
  }
}
