import { Vehicles } from "@/pages/platform/vehicles";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Veículos | Moovilog",
	description: "",
};

export default function VehiclesPagePlatform() {
	return (
		<main>
			<Vehicles />
		</main>
	);
}
