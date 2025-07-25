import { Prisma, User } from "@prisma/client";
import { IExtraDataOnboardingStep } from "@/modules/user/interfaces/user";

interface ExtendedCreateUser extends Prisma.UserCreateInput {
  extraData: {
    onboardingStep: IExtraDataOnboardingStep;
  };
}

export interface UsersRepository {
  create(data: ExtendedCreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<void>;
  updatePassword(id: string, password: string): Promise<void>;
  updateExtraData(id: string, onboardingStep: IExtraDataOnboardingStep): Promise<void>;
}
