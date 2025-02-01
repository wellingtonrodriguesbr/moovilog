import { CompleteRegistrationForm } from "@/components/auth/pages/complete-registration/components/complete-registration-form";

export function CompleteRegistration() {
	return (
		<div className="w-full flex flex-col justify-center">
			<h1 className="font-semibold text-2xl md:text-3xl my-8">
				Conclua seu cadastro
			</h1>
			<CompleteRegistrationForm />
		</div>
	);
}
