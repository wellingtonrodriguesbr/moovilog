import { Metadata } from "next";
import { RegisterCompanyStatesAreasService } from "@/components/platform/pages/company/components/register-company-states-areas-service";

export const metadata: Metadata = {
	title: "Cadastro de Empresa | Moovilog",
	description: "",
};

export default function RegisterCompanyStatesAreasServicePage() {
	return (
		<main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
			<RegisterCompanyStatesAreasService />
		</main>
	);
}
