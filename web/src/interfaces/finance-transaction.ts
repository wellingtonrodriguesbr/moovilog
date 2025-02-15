import { FinanceCategory } from "@/interfaces/finance-category";

export interface FinanceTransaction {
	id: string;
	description: string | null;
	amountInCents: number;
	dueDate: Date | null;
	type: "INCOME" | "EXPENSE";
	status: "PENDING" | "PAID" | "OVERDUE";
	paymentMethod:
		| "PIX"
		| "CREDIT_CARD"
		| "DEBIT_CARD"
		| "CASH"
		| "BANK_TRANSFER"
		| "OTHER"
		| null;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
	companyId: string;
	creatorId: string;
	category: FinanceCategory;
}
