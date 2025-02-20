import { BackPageButton } from "@/components/platform/back-page-button";
import { UnderConstruction } from "@/components/platform/under-construction";

export function RegisterPickups() {
	return (
		<section>
			<header className="flex flex-col items-start gap-12">
				<BackPageButton />
				<h1 className="text-2xl md:text-3xl font-medium">
					Cadastrar coletas
				</h1>
			</header>
			<div className="mt-12">
				<UnderConstruction />
			</div>
		</section>
	);
}
