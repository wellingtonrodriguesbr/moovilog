import { useGetCompanyAddress } from "@/hooks/company/use-get-company-address";
import { useGetCompanyInformation } from "@/hooks/company/use-get-company-information";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "react-use";

interface OnboardingContextType {
	onBoardingStep:
		| "register-company"
		| "register-company-address"
		| "complete"
		| undefined;
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

	const [step, setStep] =
		useLocalStorage<OnboardingContextType["onBoardingStep"]>(
			"onboarding-step"
		);

	const { companyInformation, isGetCompanyInformationPending } =
		useGetCompanyInformation();
	const { companyAddress, isGetCompanyAddressPending } =
		useGetCompanyAddress();

	useEffect(() => {
		if (
			!isGetCompanyInformationPending &&
			!companyInformation &&
			!pathname.includes("/empresa")
		) {
			setStep("register-company");
		} else if (
			!isGetCompanyAddressPending &&
			!companyAddress &&
			pathname.includes("/empresa") &&
			companyInformation
		) {
			setStep("register-company-address");
		} else if (
			companyInformation &&
			companyAddress &&
			!isGetCompanyInformationPending &&
			!isGetCompanyAddressPending &&
			step === undefined
		) {
			setStep("complete");
		}
	}, [
		companyInformation,
		companyAddress,
		isGetCompanyInformationPending,
		isGetCompanyAddressPending,
		pathname,
		router,
		step,
		setStep,
	]);

	useEffect(() => {
		if (step === "register-company") {
			router.push("/cadastro/empresa");
		} else if (step === "register-company-address") {
			router.push("/cadastro/empresa/endereco");
		} else if (step === "complete") {
			router.push("/inicio");
		}
	}, [step, router]);

	return (
		<OnboardingContext.Provider value={{ onBoardingStep: step }}>
			{children}
		</OnboardingContext.Provider>
	);
}
