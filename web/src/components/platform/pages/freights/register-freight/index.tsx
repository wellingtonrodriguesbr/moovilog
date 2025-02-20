import Link from "next/link";

import { RegisterFreightForm } from "@/components/platform/pages/freights/register-freight/components/register-freight-form";
import { ArrowLeft } from "lucide-react";

export function RegisterFreight() {
	return (
		<section>
			<header className="space-y-2">
				<Link
					className="w-fit flex items-center gap-2 hover:underline text-sm group mb-8"
					href="/fretes"
				>
					<ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
					Voltar
				</Link>
				<h1 className="font-medium text-2xl">Novo frete</h1>
				<span className="block text-sm text-zinc-600">
					Preencha as informações abaixo para cadastrar um novo frete.
				</span>
			</header>

			<div className="mt-12">
				<RegisterFreightForm />
			</div>
		</section>
	);
}
