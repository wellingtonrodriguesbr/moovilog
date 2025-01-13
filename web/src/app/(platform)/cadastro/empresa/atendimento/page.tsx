import { Metadata } from "next";
import { RegisterCompanyAreaService } from "@/components/platform/company/register-company-area-service";

export const metadata: Metadata = {
	title: "Cadastro de Empresa | Moovilog",
	description: "",
};

export default function RegisterCompanyAreaServicePage() {
	return (
		<main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
			<RegisterCompanyAreaService />
		</main>
	);
}
