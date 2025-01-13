import { RegisterCompanyAreaServiceForm } from "@/components/platform/company/register-company-area-service-form";

export function RegisterCompanyAreaService() {
	return (
		<section>
			<header className="w-full flex flex-col md:flex-row gap-4 item-start md:items-center justify-between">
				<h1 className="font-medium text-2xl">
					Cadastro da área de atendimento
				</h1>
				<span className="text-sm">Etapa 03 de 03</span>
			</header>

			<div className="mt-10 md:mt-16">
				<RegisterCompanyAreaServiceForm />
			</div>
		</section>
	);
}
