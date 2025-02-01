import { Metadata } from "next";
import { Home } from "@/components/platform/pages/home";

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
