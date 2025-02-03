import { RegisterFreightForm } from "@/components/platform/pages/freights/register-freight/components/register-freight-form";

export function RegisterFreight() {
	return (
		<section>
			<header className="space-y-2">
				<h1 className="font-medium text-2xl">Novo frete</h1>
				<span className="block text-sm">
					Preencha as informações abaixo para cadastrar um novo frete.
				</span>
			</header>

			<div className="mt-12">
				<RegisterFreightForm />
			</div>
		</section>
	);
}
