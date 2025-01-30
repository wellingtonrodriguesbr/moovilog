import { Metadata } from "next";
import { Home } from "@/modules/platform/home";

export const metadata: Metadata = {
	title: "Início | Moovilog",
	description: "",
};

export default function HomePagePlatform() {
	return (
		<main className="w-full">
			<Home />
		</main>
	);
}
