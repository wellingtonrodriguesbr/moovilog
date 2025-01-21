import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { FetchCompanyRoutesUseCase } from "@/use-cases/fetch-company-routes-use-case";
import { PrismaRoutesRepository } from "@/repositories/prisma/prisma-routes-repository";

export function makeFetchCompanyRoutesUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const routesRepository = new PrismaRoutesRepository();

	const fetchCompanyRoutesUseCase = new FetchCompanyRoutesUseCase(
		companyMembersRepository,
		routesRepository
	);

	return fetchCompanyRoutesUseCase;
}
