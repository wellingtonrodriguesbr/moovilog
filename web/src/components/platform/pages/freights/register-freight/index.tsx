import { BackPageButton } from "@/components/platform/back-page-button";
import { RegisterFreightForm } from "./components/register-freight-form";

export function RegisterFreight() {
	return (
		<section className="flex flex-col gap-4">
			<header className="space-y-2">
				<BackPageButton />
				<h1 className="font-medium text-2xl">Novo frete</h1>
				<span className="block text-sm text-zinc-600">
					Preencha as informações abaixo para cadastrar um novo frete.
				</span>
			</header>

			<RegisterFreightForm />
		</section>
	);
}
