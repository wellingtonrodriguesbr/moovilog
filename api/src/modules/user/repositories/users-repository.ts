import { Prisma, User } from "@prisma/client";
import { IExtraDataOnboardingStep } from "@/modules/user/interfaces/user";

export interface UsersRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	findById(id: string): Promise<User | null>;
	findByPhone(phone: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	updatePassword(id: string, password: string): Promise<void>;
	updateExtraData(
		id: string,
		onboardingStep: IExtraDataOnboardingStep
	): Promise<void>;
}
