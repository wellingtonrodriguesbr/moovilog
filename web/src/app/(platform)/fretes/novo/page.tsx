import { RegisterFreight } from "@/components/platform/pages/freights/register-freight";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Novo frete | Moovilog",
	description: "",
};

export default function RegisterNewFreightPagePlatform() {
	return (
		<main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
			<RegisterFreight />
		</main>
	);
}
