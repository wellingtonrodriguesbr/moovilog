import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { FreightDetailsForm } from "@/components/platform/pages/freights/freight-details/components/freight-details-form";

export function FreightDetails() {
	return (
		<section>
			<header className="flex flex-col items-start gap-12">
				<Link
					className="w-fit flex items-center gap-2 hover:underline text-sm group"
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
				<FreightDetailsForm />
			</div>
		</section>
	);
}
