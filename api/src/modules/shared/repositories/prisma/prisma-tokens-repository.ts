import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { TokensRepository } from "@/modules/shared/repositories/tokens-repository";

export class PrismaTokensRepository implements TokensRepository {
	async create(data: Prisma.TokenUncheckedCreateInput) {
		await prisma.token.create({
			data,
		});
	}

	async findByCode(code: string) {
		const token = await prisma.token.findUnique({
			where: {
				code,
			},
		});

		return token;
	}

	async deleteByUserId(userId: string) {
		await prisma.token.deleteMany({
			where: {
				userId,
			},
		});
	}
}
