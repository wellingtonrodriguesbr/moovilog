import { ProfileForm } from "@/components/platform/pages/profile/components/profile-form";
import { BackPageButton } from "@/components/platform/back-page-button";

export function Profile() {
	return (
		<section className="w-full max-w-lg mx-auto px-4 mt-8">
			<header className="space-y-4">
				<BackPageButton />
				<h1 className="font-semibold text-2xl md:text-3xl">
					Informações de cadastro
				</h1>
			</header>
			<ProfileForm />
		</section>
	);
}
