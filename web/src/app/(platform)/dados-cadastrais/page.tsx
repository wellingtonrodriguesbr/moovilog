import { Metadata } from "next";
import { CompanyInformation } from "@/pages/platform/company/components/company-information";

export const metadata: Metadata = {
	title: "Dados cadastrais | Moovilog",
	description: "",
};

export default function CompanyInformationPlatform() {
	return (
		<main>
			<CompanyInformation />
		</main>
	);
}
