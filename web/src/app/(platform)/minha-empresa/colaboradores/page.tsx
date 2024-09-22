import { Collaborators } from "@/components/platform/collaborators";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Colaboradores | Moovilog",
	description: "",
};

export default function CompanyMembersPlatform() {
	return (
		<main>
			<Collaborators />
		</main>
	);
}
