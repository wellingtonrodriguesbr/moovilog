import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AuthLinksRepository } from "../auth-links-repository";

export class PrismaAuthLinksRepository implements AuthLinksRepository {
	async create(data: Prisma.AuthLinkUncheckedCreateInput) {
		await prisma.authLink.create({
			data,
		});
	}

	async findByCode(code: string) {
		const authLink = await prisma.authLink.findUnique({
			where: {
				code,
			},
		});

		return authLink;
	}

	async deleteByUserId(userId: string) {
		await prisma.authLink.deleteMany({
			where: {
				userId,
			},
		});
	}
}
