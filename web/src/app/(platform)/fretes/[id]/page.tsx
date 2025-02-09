import { Metadata } from "next";
import { FreightDetails } from "@/components/platform/pages/freights/freight-details";

export const metadata: Metadata = {
	title: "Detalhes do frete | Moovilog",
	description: "",
};

export default function FreightDetailsPagePlatform() {
	return (
		<main>
			<FreightDetails />
		</main>
	);
}
