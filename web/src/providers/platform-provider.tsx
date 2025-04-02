"use client";

import { ReactNode } from "react";

import { OnboardingContextProvider } from "@/contexts/onboarding-context";

export function PlatformProvider({ children }: { children: ReactNode }) {
	return <OnboardingContextProvider>{children}</OnboardingContextProvider>;
}
