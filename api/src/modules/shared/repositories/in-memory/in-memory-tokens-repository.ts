import { Token, Prisma } from "@prisma/client";
import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";

import { randomUUID } from "node:crypto";

export class InMemoryTokensRepository implements TokensRepository {
	public items: Token[] = [];

	async create(data: Prisma.TokenUncheckedCreateInput) {
		const token = {
			id: data.id ?? randomUUID(),
			code: data.code,
			type: data.type,
			userId: data.userId,
			createdAt: new Date(data.createdAt as Date) ?? new Date(),
		};

		this.items.push(token);
	}

	async findByCode(code: string) {
		const token = this.items.find((item) => item.code === code);

		if (!token) {
			return null;
		}

		return token;
	}

	async deleteByUserId(userId: string) {
		const index = this.items.findIndex((item) => item.userId === userId);

		this.items.splice(index, 1);
	}
}
