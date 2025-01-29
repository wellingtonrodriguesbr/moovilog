import { RegisterCompanyForm } from "@/pages/platform/company/components/register-company-form";

export function RegisterCompany() {
	return (
		<section>
			<header className="w-full flex flex-col md:flex-row gap-4 item-start md:items-center justify-between">
				<h1 className="font-medium text-2xl">Cadastro de empresa</h1>
				<span className="text-sm">Etapa 01 de 03</span>
			</header>

			<div className="mt-10 md:mt-16">
				<RegisterCompanyForm />
			</div>
		</section>
	);
}
