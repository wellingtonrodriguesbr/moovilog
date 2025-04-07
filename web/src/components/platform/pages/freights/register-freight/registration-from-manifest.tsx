import Link from "next/link";

import { BackPageButton } from "@/components/platform/back-page-button";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export function RegistrationFromManifest() {
	return (
		<section>
			<header className="space-y-2">
				<BackPageButton />
				<h1 className="font-medium text-2xl">Cadastro por manifesto</h1>
				<span className="block text-sm text-zinc-600">
					Envie um manifesto de transporte em PDF, revise os dados
					extraídos e salve o frete com agilidade.
				</span>
			</header>

			<div className="flex flex-col items-center gap-4 bg-zinc-100 rounded-lg p-6 mt-6">
				<TriangleAlert className="size-8 text-amber-500" />
				<p className="text-center">
					Essa funcionalidade está em construção, por hora use o
					cadastro manual:
				</p>
				<Button className="w-full md:w-fit" asChild>
					<Link href="/fretes/novo/manual">Cadastro manual</Link>
				</Button>
			</div>
		</section>
	);
}
