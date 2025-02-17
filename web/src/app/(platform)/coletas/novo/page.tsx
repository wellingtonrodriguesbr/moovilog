import { RegisterPickups } from "@/components/platform/pages/pickups/register-pickups";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nova coleta | Moovilog",
	description: "",
};

export default function RegisterNewPickupPagePlatform() {
	return (
		<main className="w-full max-w-screen-lg mx-auto p-4 md:p-6">
			<RegisterPickups />
		</main>
	);
}
