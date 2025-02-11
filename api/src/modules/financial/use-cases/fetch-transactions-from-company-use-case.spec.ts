import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCompanyMembersRepository } from "@/modules/company-member/repositories/in-memory/in-memory-company-members-repository";
import { InMemoryCompaniesRepository } from "@/modules/company/repositories/in-memory/in-memory-companies-repository";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { FetchTransactionsFromCompanyUseCase } from "@/modules/financial/use-cases/fetch-transactions-from-company-use-case";
import { InMemoryFinanceTransactionsRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-transactions-repository";
import { InMemoryFinanceCategoriesRepository } from "@/modules/financial/repositories/in-memory/in-memory-finance-categories-repository";

let usersRepository: InMemoryUsersRepository;
let companiesRepository: InMemoryCompaniesRepository;
let companyMembersRepository: InMemoryCompanyMembersRepository;
let financeTransactionsRepository: InMemoryFinanceTransactionsRepository;
let financeCategoriesRepository: InMemoryFinanceCategoriesRepository;
let sut: FetchTransactionsFromCompanyUseCase;

describe("[MODULE]: Fetch transactions from company use case", () => {
	beforeEach(async () => {
		usersRepository = new InMemoryUsersRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		companyMembersRepository = new InMemoryCompanyMembersRepository();
		financeTransactionsRepository = new InMemoryFinanceTransactionsRepository();
		financeCategoriesRepository = new InMemoryFinanceCategoriesRepository();
		sut = new FetchTransactionsFromCompanyUseCase(
			companyMembersRepository,
			companiesRepository,
			financeTransactionsRepository
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
			role: "ADMIN",
		});

		await financeCategoriesRepository.create({
			id: "category-id-01",
			name: "Frete",
		});

		await financeTransactionsRepository.create({
			id: "transaction-id-01",
			date: new Date(),
			amountInCents: 1000,
			status: "PAID",
			type: "EXPENSE",
			categoryId: "category-id-01",
			creatorId: "company-member-id-01",
			companyId: "company-id-01",
		});
	});

	it("should be able to fetch transactions", async () => {
		const { transactions } = await sut.execute({
			userId: "john-doe-id-01",
			companyId: "company-id-01",
		});

		expect(transactions).toHaveLength(1);
		expect(transactions[0].id).toEqual(expect.any(String));
		expect(transactions[0].type).toStrictEqual("EXPENSE");
	});

	it("should not be able to fetch transactions if the company member is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existent-user-id",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch transactions if the company is not found", async () => {
		await expect(() =>
			sut.execute({
				userId: "john-doe-id-01",
				companyId: "non-existent-company-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be able to fetch transactions if company member role is not admin or manager or financial", async () => {
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
			role: "OPERATIONAL",
		});

		await expect(() =>
			sut.execute({
				userId: "john-doe-id-02",
				companyId: "company-id-01",
			})
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
