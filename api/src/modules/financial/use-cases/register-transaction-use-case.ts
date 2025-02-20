import { FinanceTransactionsRepository } from "@/modules/financial/repositories/finance-transactions-repository";
import { FinanceCategoriesRepository } from "@/modules/financial/repositories/finance-categories-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import {
	IFinanceTransaction,
	IFinanceTransactionStatus,
	IFinanceTransactionTypes,
	IFinanceTransactionPaymentMethod,
} from "@/modules/financial/interfaces/finance-transaction";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { DriversRepository } from "@/modules/driver/repositories/drivers-repository";
import { DriverTransactionsRepository } from "../repositories/driver-transactions-repository";

interface RegisterTransactionUseCaseRequest {
	description?: string | null;
	amountInCents: number;
	dueDate: Date;
	status: IFinanceTransactionStatus;
	type: IFinanceTransactionTypes;
	paymentMethod: IFinanceTransactionPaymentMethod;
	creatorId: string;
	companyId: string;
	driverId?: string | null;
	categoryName: string;
}

interface RegisterTransactionUseCaseResponse {
	transaction: IFinanceTransaction;
}

const ROLE_PERMISSIONS = ["FINANCIAL", "MANAGER", "ADMIN"];

export class RegisterTransactionUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private companiesRepository: CompaniesRepository,
		private driversRepository: DriversRepository,
		private driverTransactionsRepository: DriverTransactionsRepository,
		private financeTransactionsRepository: FinanceTransactionsRepository,
		private financeCategoriesRepository: FinanceCategoriesRepository
	) {}

	async execute({
		description,
		amountInCents,
		dueDate,
		status,
		type,
		paymentMethod,
		categoryName,
		creatorId,
		driverId,
		companyId,
	}: RegisterTransactionUseCaseRequest): Promise<RegisterTransactionUseCaseResponse> {
		const [memberInCompany, company] = await Promise.all([
			this.companyMembersRepository.findMemberInCompany(creatorId, companyId),
			this.companiesRepository.findById(companyId),
		]);

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!ROLE_PERMISSIONS.includes(memberInCompany.role)) {
			throw new NotAllowedError(
				"You do not have permission to perform this action, please ask your administrator for access"
			);
		}

		const transactionCategory =
			await this.financeCategoriesRepository.findByName(categoryName);

		if (!transactionCategory) {
			throw new ResourceNotFoundError("Category not found");
		}

		const transaction = await this.financeTransactionsRepository.create({
			description,
			amountInCents,
			dueDate,
			status,
			paymentMethod,
			type,
			companyId,
			creatorId: memberInCompany.id,
			categoryId: transactionCategory.id,
		});

		if (
			["Coletas e Entregas", "Combustível", "Pedágios"].includes(
				transactionCategory.name
			) &&
			driverId
		) {
			const driver = await this.driversRepository.findById(driverId);

			if (!driver) {
				throw new ResourceNotFoundError("Driver not found");
			}

			const driverinCompany = await this.driversRepository.findDriverInCompany(
				driver.documentNumber,
				companyId
			);

			if (!driverinCompany) {
				throw new ResourceNotFoundError("Driver not found in company");
			}

			await this.driverTransactionsRepository.create({
				financeTransactionId: transaction.id,
				driverId: driver.id,
			});
		}

		return {
			transaction,
		};
	}
}
