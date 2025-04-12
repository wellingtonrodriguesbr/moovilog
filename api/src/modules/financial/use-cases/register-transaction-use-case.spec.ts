import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { RegisterTransactionUseCase } from "@/modules/financial/use-cases/register-transaction-use-case";
import { InMemoryFinanceTransactionsRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-transactions-repository";
import { InMemoryFinanceCategoriesRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-categories-repository";
import { InMemoryDriversRepository } from "@/modules/driver/repositories/in-memory/in-memory-drivers-repository";
import { InMemoryDriverTransactionsRepository } from "@/modules/financial/repositories/in-memory/in-memory-driver-transactions-repository";
import { PermissionService } from "@/services/permission-service";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let driversRepository: InMemoryDriversRepository;
let driverTransactionsRepository: InMemoryDriverTransactionsRepository;
let financeTransactionsRepository: InMemoryFinanceTransactionsRepository;
let financeCategoriesRepository: InMemoryFinanceCategoriesRepository;
let permissionService: PermissionService;
let sut: RegisterTransactionUseCase;

describe("[MODULE]: Register transaction use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		driversRepository = new InMemoryDriversRepository();
		driverTransactionsRepository = new InMemoryDriverTransactionsRepository();
		financeTransactionsRepository = new InMemoryFinanceTransactionsRepository();
		financeCategoriesRepository = new InMemoryFinanceCategoriesRepository();
		permissionService = new PermissionService(companyMembersRepository);
		sut = new RegisterTransactionUseCase(
			companyMembersRepository,
			companiesRepository,
			driversRepository,
			driverTransactionsRepository,
			financeTransactionsRepository,
			financeCategoriesRepository,
			permissionService
		);

		await usersRepository.create({
			id: "john-doe-id-01",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companiesRepository.create({
			id: "company-id-01",
			name: "Company name",
			documentNumber: "12312312389899",
			size: "MEDIUM",
			ownerId: "john-doe-01",
		});

		await companyMembersRepository.create({
			id: "company-member-id-01",
			companyId: "company-id-01",
			userId: "john-doe-id-01",
			sector: "Diretoria",
			extraData: {
				permissions: ["MANAGE_FINANCES"],
			},
		});

		await financeCategoriesRepository.create({
			id: "category-id-01",
			name: "Frete",
		});
	});

	it("should be able to register a new transaction", async () => {
		const { transaction } = await sut.execute({
			amountInCents: 100000,
			dueDate: new Date(),
			status: "PAID",
			type: "EXPENSE",
			paymentMethod: "PIX",
			categoryName: "Frete",
			creatorId: "john-doe-id-01",
			companyId: "company-id-01",
		});

		expect(transaction.amountInCents).toStrictEqual(100000);
		expect(transaction.categoryId).toStrictEqual("category-id-01");
		expect(transaction.type).toStrictEqual("EXPENSE");
		expect(transaction.creatorId).toStrictEqual("company-member-id-01");
	});

	it("should not be able to register a new transaction if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				amountInCents: 100000,
				dueDate: new Date(),
				status: "PAID",
				type: "EXPENSE",
				paymentMethod: "PIX",
				categoryName: "Frete",
				creatorId: "unexistent-creator-id",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch transactions if the company is not found", async () => {
		await expect(() =>
			sut.execute({
				amountInCents: 100000,
				dueDate: new Date(),
				status: "PAID",
				type: "EXPENSE",
				paymentMethod: "PIX",
				categoryName: "Frete",
				creatorId: "john-doe-id-01",
				companyId: "unexistent-company-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be possible to register a new transaction if the company member does not have the necessary permissions", async () => {
		await usersRepository.create({
			id: "john-doe-id-02",
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345678",
		});

		await companyMembersRepository.create({
			id: "company-member-id-02",
			companyId: "company-id-01",
			userId: "john-doe-id-02",
			sector: "Ajudante de carga e descarga",
			extraData: {
				permissions: ["VIEW_ROUTES"],
			},
		});

		await expect(() =>
			sut.execute({
				amountInCents: 100000,
				dueDate: new Date(),
				status: "PAID",
				type: "EXPENSE",
				paymentMethod: "PIX",
				categoryName: "Frete",
				creatorId: "john-doe-id-02",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
