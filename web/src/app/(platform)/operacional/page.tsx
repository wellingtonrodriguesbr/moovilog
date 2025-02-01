import { Metadata } from "next";
import { Operational } from "@/components/platform/pages/operational";

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
