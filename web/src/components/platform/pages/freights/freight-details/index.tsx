import Link from "next/link";

import { UnderConstruction } from "@/components/platform/under-construction";
import { ArrowLeft } from "lucide-react";

export function FreightDetails() {
	return (
		<section>
			<header className="flex flex-col items-start gap-12">
				<Link
					className="flex items-center gap-2 hover:underline text-sm group"
					href="/fretes"
				>
					<ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
					Voltar
				</Link>
				<h1 className="text-2xl md:text-3xl font-medium">
					Detalhes do frete
				</h1>
			</header>
			<div className="mt-12">
				<UnderConstruction />
			</div>
		</section>
	);
}
