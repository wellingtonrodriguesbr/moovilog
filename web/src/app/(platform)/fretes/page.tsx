import { Metadata } from "next";
import { Freights } from "@/components/platform/pages/freights";
import { UnderConstruction } from "@/components/platform/under-construction";

export const metadata: Metadata = {
	title: "Fretes | Moovilog",
	description: "",
};

export default function FreightsPagePlatform() {
	return (
		<main>
			<Freights />
			<UnderConstruction />
		</main>
	);
}
