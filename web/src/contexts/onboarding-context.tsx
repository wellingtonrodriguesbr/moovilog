import { useGetProfile } from "@/hooks/user/use-get-profile";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useRef } from "react";
import { toast } from "sonner";

interface OnboardingContextType {
	onBoardingStep:
		| "register-company"
		| "register-company-address"
		| "onboarding_complete"
		| null;
}

interface OnboardingContextProviderProps {
	children: ReactNode;
}

export const OnboardingContext = createContext({} as OnboardingContextType);

export function OnboardingContextProvider({
	children,
}: OnboardingContextProviderProps) {
	const router = useRouter();
	const pathname = usePathname();
	const hasShownToast = useRef(false);

	const { profile, isGetProfilePending } = useGetProfile();

	useEffect(() => {
		if (hasShownToast.current) return;

		const redirectPathsToHome = [
			"/cadastro/empresa",
			"/cadastro/empresa/endereco",
		];

		if (!isGetProfilePending && profile && profile.extraData) {
			if (profile.extraData.onboardingStep === "register_company") {
				router.push("/cadastro/empresa");
				toast.warning("Cadastre sua empresa");
				hasShownToast.current = true;
			} else if (
				profile.extraData.onboardingStep === "register_company_address"
			) {
				router.push("/cadastro/empresa/endereco");
				toast.warning("Cadastre o endereço da empresa");
				hasShownToast.current = true;
			} else if (
				profile.extraData.onboardingStep === "complete_onboarding" &&
				redirectPathsToHome.includes(pathname)
			) {
				router.push("/inicio");
			}
		}
	}, [profile, isGetProfilePending, router, pathname]);

	return (
		<OnboardingContext.Provider value={{ onBoardingStep: null }}>
			{children}
		</OnboardingContext.Provider>
	);
}
