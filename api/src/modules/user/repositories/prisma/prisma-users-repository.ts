import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "@/modules/user/repositories/users-repository";

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}

	async findById(id: string) {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async findByPhone(phone: string) {
		const user = await prisma.user.findUnique({
			where: {
				phone,
			},
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async updatePassword(id: string, password: string) {
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				password,
			},
		});
	}
}
