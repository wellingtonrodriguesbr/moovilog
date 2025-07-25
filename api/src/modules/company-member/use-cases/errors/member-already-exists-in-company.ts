export class MemberAlreadyExistsInCompanyError extends Error {
  constructor(message?: string) {
    super(message ?? "There is already a company member with this email");
  }
}
