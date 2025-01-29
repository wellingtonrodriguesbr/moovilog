import { CardLink } from "@/components/platform/card-link";

export function Operational() {
	return (
		<section className="flex flex-col gap-12">
			<header className="flex flex-col gap-4">
				<h1 className="text-2xl md:text-3xl font-medium">
					Operacional
				</h1>
				<p>
					Aqui você poderá consultar a programação do dia, gerenciar
					os suprimentos e verificar avisos deixados para gerência.
				</p>
			</header>
			<div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
				<CardLink
					title="Programação do dia"
					link="/operacional/programacao-do-dia"
					description="Acompanhe a programação do dia"
				/>
				<CardLink
					title="Recursos e Suprimentos"
					link="/operacional/recursos-e-suprimentos"
					description="Acompanhe os suprimentos"
				/>
				<CardLink
					title="Avisos"
					link="/operacional/avisos"
					description="Acompanhe os avisos"
				/>
			</div>
		</section>
	);
}
