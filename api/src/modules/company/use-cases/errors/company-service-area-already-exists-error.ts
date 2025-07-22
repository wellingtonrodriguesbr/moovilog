export class CompanyServiceAreaAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? "Company service area already exists with same code");
  }
}
