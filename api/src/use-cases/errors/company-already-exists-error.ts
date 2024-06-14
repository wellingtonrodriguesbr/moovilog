export class CompanyAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? "A company already exists with this document number");
  }
}
