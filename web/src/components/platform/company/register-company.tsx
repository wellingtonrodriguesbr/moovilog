import { RegisterCompanyForm } from "./register-company-form";

export function RegisterCompany() {
	return (
		<section>
			<header className="w-full flex items-center justify-between">
				<h1 className="font-medium text-2xl">Cadastro de empresa</h1>
				<span className="text-sm">Etapa 01 de 02</span>
			</header>

			<div className="mt-16">
				<RegisterCompanyForm />
			</div>
		</section>
	);
}
