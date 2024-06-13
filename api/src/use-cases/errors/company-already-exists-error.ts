export class CompanyAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? "Company already exists");
  }
}
