import { Metadata } from "next";
import { Operational } from "@/pages/platform/operational";

export const metadata: Metadata = {
	title: "Operacional | Moovilog",
	description: "",
};

export default function OperationalPagePlatform() {
	return (
		<main>
			<Operational />
		</main>
	);
}
