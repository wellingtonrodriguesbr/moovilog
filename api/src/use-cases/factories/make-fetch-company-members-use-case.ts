import { FetchCompanyMembersUseCase } from "../fetch-company-members-use-case";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";

export function makeFetchCompanyMembersUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const fetchCompanyMembersUseCase = new FetchCompanyMembersUseCase(
		companyMembersRepository,
	);

	return fetchCompanyMembersUseCase;
}
