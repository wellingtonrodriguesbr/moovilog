import { RegistrationFromManifest } from "@/components/platform/pages/freights/register-freight/registration-from-manifest";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Novo frete | Moovilog",
	description: "",
};

export default function RegistrationFromManifestPagePlatform() {
	return (
		<main className="w-full xl:max-w-screen-lg mx-auto p-0 md:p-6">
			<RegistrationFromManifest />
		</main>
	);
}
