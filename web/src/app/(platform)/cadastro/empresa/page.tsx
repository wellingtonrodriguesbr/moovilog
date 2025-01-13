import { Metadata } from "next";
import { RegisterCompany } from "@/components/platform/company/register-company";

export const metadata: Metadata = {
	title: "Cadastro de Empresa | Moovilog",
	description: "",
};

export default function RegisterCompanyPage() {
	return (
		<main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
			<RegisterCompany />
		</main>
	);
}
