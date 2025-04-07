import { BackPageButton } from "@/components/platform/back-page-button";
import { RegisterFreightForm } from "./components/register-freight-form";

export function ManualRegistration() {
	return (
		<section>
			<header className="space-y-2">
				<BackPageButton />
				<h1 className="font-medium text-2xl">Cadastro manual</h1>
				<span className="block text-sm text-zinc-600">
					Preencha manualmente os campos abaixo para registrar um novo
					frete com todos os detalhes.
				</span>
			</header>

			<div className="mt-6">
				<RegisterFreightForm />
			</div>
		</section>
	);
}
