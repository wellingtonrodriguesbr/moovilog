import { AuthLink, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AuthLinksRepository } from "../auth-links-repository";

export class InMemoryAuthLinksRepository implements AuthLinksRepository {
	public items: AuthLink[] = [];

	async create(data: Prisma.AuthLinkCreateInput) {
		const authLink = {
			id: data.id ?? randomUUID(),
			code: data.code,
			createdAt: new Date(),
		};

		this.items.push(authLink);
	}
}
