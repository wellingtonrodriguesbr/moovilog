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
					os suprimentos e verificar avisos deixados pela gerência.
				</p>
			</header>
			<div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
				<CardLink
					title="Programação do dia"
					link="/operacional/programacao-do-dia"
					description="Seção destinada ao acompanhamento das atividades diárias, com a agenda de tarefas, cronograma de carregamentos e prioridades para otimizar o planejamento e a execução das operações."
				/>
				<CardLink
					title="Recursos e Suprimentos"
					link="/operacional/recursos-e-suprimentos"
					description="Área voltada para o controle de estoque e recursos, permitindo a otimização de custos e planejamento eficiente para garantir a disponibilidade de materiais essenciais."
				/>
				<CardLink
					title="Avisos"
					link="/operacional/avisos"
					description="Espaço dedicado à comunicação de informações importantes, como atualizações, alertas operacionais e notificações relevantes para manter todos os usuários informados em tempo real."
				/>
			</div>
		</section>
	);
}
