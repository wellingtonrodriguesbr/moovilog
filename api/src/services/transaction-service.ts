import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class TransactionService {
	async executeTransaction<T>(
		callback: (tx: Prisma.TransactionClient) => Promise<T>
	): Promise<T> {
		return prisma.$transaction(callback);
	}
}
