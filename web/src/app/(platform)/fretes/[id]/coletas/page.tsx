import { Metadata } from "next";
import { RegisterPickups } from "@/components/platform/pages/pickups/register-pickups";

export const metadata: Metadata = {
	title: "Cadastrar coletas | Moovilog",
	description: "",
};

export default function FreightRegisterPickupsPagePlatform() {
	return (
		<main>
			<RegisterPickups />
		</main>
	);
}
