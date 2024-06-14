export class CompanyMemberAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? "Company member already exists");
  }
}
