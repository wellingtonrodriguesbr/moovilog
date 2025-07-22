export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  extraData: UserExtraData;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserExtraData {
  onboardingStep: "register_company" | "register_company_address" | "complete_onboarding" | null;
}
