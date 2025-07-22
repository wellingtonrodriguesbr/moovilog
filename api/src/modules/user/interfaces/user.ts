import { User } from "@prisma/client";

export type IUser = User;

export type IExtraDataOnboardingStep = "register_company" | "register_company_address" | "complete_onboarding";

export type IUserExtraData = {
  onboardingStep: IExtraDataOnboardingStep;
};
