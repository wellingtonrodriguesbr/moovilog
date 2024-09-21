import { PrismaFreightsRepository } from "@/repositories/prisma/prisma-freights-repository";
import { PrismaCompanyMembersRepository } from "@/repositories/prisma/prisma-company-members-repository";
import { FetchFreightsFromCompanyUseCase } from "../fetch-freights-from-company-use-case";

export function makeFetchFreightsFromCompanyUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const freightsRepository = new PrismaFreightsRepository();

	const fetchFreightsFromCompanyUseCase = new FetchFreightsFromCompanyUseCase(
		companyMembersRepository,
		freightsRepository,
	);

	return fetchFreightsFromCompanyUseCase;
}
