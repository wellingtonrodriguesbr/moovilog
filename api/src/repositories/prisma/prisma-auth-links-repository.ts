import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AuthLinksRepository } from "../auth-links-repository";

export class PrismaAuthLinksRepository implements AuthLinksRepository {
	async create(data: Prisma.AuthLinkCreateInput) {
		await prisma.authLink.create({
			data,
		});
	}
}
