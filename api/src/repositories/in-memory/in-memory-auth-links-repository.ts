import { randomUUID } from "crypto";
import { AuthLink, Prisma } from "@prisma/client";
import { AuthLinksRepository } from "@/repositories/auth-links-repository";

export class InMemoryAuthLinksRepository implements AuthLinksRepository {
	public items: AuthLink[] = [];

	async create(data: Prisma.AuthLinkUncheckedCreateInput) {
		const authLink = {
			id: data.id ?? randomUUID(),
			code: data.code,
			userId: data.userId,
			createdAt: new Date(data.createdAt as Date) ?? new Date(),
		};

		this.items.push(authLink);
	}

	async findByCode(code: string) {
		const authLink = this.items.find((item) => item.code === code);

		if (!authLink) {
			return null;
		}

		return authLink;
	}

	async deleteByUserId(userId: string) {
		const index = this.items.findIndex((item) => item.userId === userId);

		this.items.splice(index, 1);
	}
}
