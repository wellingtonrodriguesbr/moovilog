import { BackPageButton } from "@/components/platform/back-page-button";
import { RegisterPickupForm } from "./components/register-pickup-form";

export function RegisterPickups() {
	return (
		<section>
			<header className="flex flex-col items-start gap-2">
				<BackPageButton />
				<div className="w-full flex items-center justify-between">
					<h1 className="text-2xl md:text-3xl font-medium">
						Nova coleta
					</h1>
					<p className="text-sm text-zinc-600">Etapa 1 de 2</p>
				</div>
			</header>
			<div className="mt-6">
				<RegisterPickupForm />
			</div>
		</section>
	);
}
