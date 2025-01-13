import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowUpRight,
	BarChart,
	Group,
	Handshake,
	Landmark,
	LayoutGrid,
	Plus,
	Route,
	Truck,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";

export function AboutPlatform() {
	return (
		<section className="w-full h-full max-w-screen-2xl mx-auto px-4 flex flex-col gap-8 justify-center my-12">
			<div>
				<small className="flex items-center gap-1 mb-2 before:w-8 before:h-[1px] before:bg-app-blue-300">
					Sobre a plataforma
				</small>
				<div className="flex flex-col md:flex-row gap-4 items-start justify-between">
					<h2 className="font-semibold text-2xl md:text-3xl max-w-screen-lg leading-normal md:leading-relaxed">
						Tudo pensado para que você tenha mais organização e
						controle do seu negócio em um único lugar.
					</h2>
					<div className="space-y-2 max-w-screen-sm">
						<p>
							Com a Moovilog, você deixará para trás as inúmeras
							planilhas e a papelada. Tenha acesso a uma
							plataforma completa para transformar e impulsionar a
							gestão da sua transportadora.
						</p>
						<Button
							variant="link"
							className="text-app-blue-500 pl-0 group"
							asChild
						>
							<Link href={links["waiting-list"]} target="_blank">
								Quero entrar na lista de espera
								<ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
							</Link>
						</Button>
					</div>
				</div>
			</div>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{ITEMS.map((item) => (
					<Card key={item.title}>
						<CardHeader className="gap-2">
							<div className="w-fit flex items-center justify-center bg-app-blue-100 rounded-full p-2 mb-2">
								{item.icon}
							</div>
							<CardTitle className="flex items-center gap-2">
								{item.title}
							</CardTitle>
							<CardDescription className="text-zinc-600">
								{item.description}
							</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				))}
				<Card className="col-span-1 md:col-span-2 xl:col-span-1 bg-app-yellow-200 border">
					<CardHeader className="gap-2">
						<div className="w-fit flex items-center justify-center border border-app-blue-900/50 rounded-full p-2 mb-2">
							<Plus className="size-4 text-app-blue-900" />
						</div>
						<CardTitle className="flex items-center gap-2 text-app-blue-900">
							E Muitos mais...
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
		</section>
	);
}

const ITEMS = [
	{
		title: "Financeiro",
		description:
			"Gerencie todas as finanças da sua transportadora em um só lugar. Acompanhe receitas, despesas, pagamentos e relatórios financeiros detalhados para garantir o controle total do fluxo de caixa e a tomada de decisões estratégicas.",
		icon: <Landmark className="size-4 text-app-blue-500" />,
	},
	{
		title: "Fretes",
		description:
			"Organize e monitore os fretes de forma eficiente. Planeje, acompanhe e registre informações importantes sobre cada operação, desde o despacho até a entrega, garantindo maior controle e otimização de tempo e custos.",
		icon: <LayoutGrid className="size-4 text-app-blue-500" />,
	},
	{
		title: "Operacional",
		description:
			"Centralize as operações do dia a dia da sua transportadora. Consulte a programação diária com tarefas e entregas, gerencie o estoque de suprimentos essenciais e crie avisos importantes para manter toda a equipe informada e alinhada. Essa seção garante que a operação funcione de maneira organizada e sem contratempos.",
		icon: <Group className="size-4 text-app-blue-500" />,
	},
	{
		title: "Rotas",
		description:
			"Planeje e otimize as rotas para reduzir custos e aumentar a eficiência. Com informações detalhadas sobre trajetos, distâncias e prazos, sua transportadora pode oferecer entregas mais rápidas e econômicas.",
		icon: <Route className="size-4 text-app-blue-500" />,
	},
	{
		title: "Motoristas",
		description:
			"Gerencie os motoristas da sua transportadora com facilidade. Acompanhe informações como documentação, histórico de viagens, desempenho e disponibilidade, garantindo que todos os condutores estejam alinhados às operações.",
		icon: <Handshake className="size-4 text-app-blue-500" />,
	},
	{
		title: "Veículos",
		description:
			"Controle e monitore os veículos da sua frota. Registre informações como manutenção, quilometragem, documentação e disponibilidade, garantindo que sua frota esteja sempre pronta para atender às demandas do seu negócio.",
		icon: <Truck className="size-4 text-app-blue-500" />,
	},
	{
		title: "Colaboradores",
		description:
			"Centralize a gestão da equipe administrativa e operacional. Acompanhe informações de cadastro, cargos, permissões e desempenho, promovendo uma gestão eficiente e integrada de todos os colaboradores da transportadora.",
		icon: <Users className="size-4 text-app-blue-500" />,
	},
	{
		title: "Gestão de Desempenho",
		description:
			"Monitore e avalie o desempenho da sua equipe com métricas e relatórios detalhados. Acompanhe indicadores como pontualidade, produtividade, cumprimento de metas e feedbacks, tanto para motoristas quanto para colaboradores, ajudando a identificar oportunidades de desenvolvimento e a reconhecer resultados positivos.",
		icon: <BarChart className="size-4 text-app-blue-500" />,
	},
];
