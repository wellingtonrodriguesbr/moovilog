import { Routes } from "@/components/platform/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rotas | Moovilog",
	description: "",
};

export default function RoutesPlatform() {
	return (
		<main>
			<Routes />
		</main>
	);
}