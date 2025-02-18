import { PrismaDriversRepository } from "@/modules/driver/repositories/prisma/prisma-drivers-repository";
import { PrismaFreightsRepository } from "@/modules/freight/repositories/prisma/prisma-freights-repository";
import { PrismaCompanyMembersRepository } from "@/modules/company-member/repositories/prisma/prisma-company-members-repository";
import { PrismaVehiclesRepository } from "@/modules/vehicle/repositories/prisma/prisma-vehicles-repository";
import { PrismaRoutesRepository } from "@/modules/route/repositories/prisma/prisma-routes-repository";
import { RegisterFreightUseCase } from "@/modules/freight/use-cases/register-freight-use-case";
import { PrismaFinanceCategoriesRepository } from "@/modules/financial/repositories/prisma/prisma-finance-categories-repository";
import { PrismaFinanceTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-finance-transactions-repository";
import { PrismaFreightTransactionsRepository } from "@/modules/financial/repositories/prisma/prisma-freight-transactions-repository";

export function makeRegisterfreightUseCase() {
	const companyMembersRepository = new PrismaCompanyMembersRepository();
	const driversRepository = new PrismaDriversRepository();
	const freightsRepository = new PrismaFreightsRepository();
	const freightTransactionsRepository =
		new PrismaFreightTransactionsRepository();
	const vehiclesRepository = new PrismaVehiclesRepository();
	const routesRepository = new PrismaRoutesRepository();
	const financeTransactionsRepository =
		new PrismaFinanceTransactionsRepository();
	const financeCategoriesRepository = new PrismaFinanceCategoriesRepository();
	const registerFreightUseCase = new RegisterFreightUseCase(
		companyMembersRepository,
		driversRepository,
		vehiclesRepository,
		freightsRepository,
		freightTransactionsRepository,
		routesRepository,
		financeTransactionsRepository,
		financeCategoriesRepository
	);

	return registerFreightUseCase;
}
