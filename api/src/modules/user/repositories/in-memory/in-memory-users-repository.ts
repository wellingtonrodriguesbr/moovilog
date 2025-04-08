import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { randomUUID } from "node:crypto";
import {
	IExtraDataOnboardingStep,
	IUserExtraData,
} from "@/modules/user/interfaces/user";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			password: data.password || null,
			phone: data.phone || null,
			extraData: JSON.stringify(data.extraData) || null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(user);
		return user;
	}

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) return null;

		return user;
	}

	async findByPhone(phone: string) {
		const user = this.items.find((item) => item.phone === phone);

		if (!user) return null;

		return user;
	}

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);

		if (!user) return null;

		return user;
	}

	async update(id: string, data: Prisma.UserUncheckedUpdateInput) {
		const userIndex = this.items.findIndex((item) => item.id === id);

		if (userIndex === -1) {
			return;
		}

		const updatedUser = {
			...this.items[userIndex],
			...data,
		} as User;

		this.items[userIndex] = updatedUser;
	}

	async updatePassword(id: string, password: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) throw new Error("User not found");

		user.password = password;
	}

	async updateExtraData(id: string, onboardingStep: IExtraDataOnboardingStep) {
		const user = this.items.find((item) => item.id === id);

		if (!user) throw new Error("User not found");

		(user?.extraData as IUserExtraData).onboardingStep = onboardingStep;
	}
}
