import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
	formatBrazilianDate,
	formatShortcutBrazilianDate,
} from "@/utils/format-brazilian-date";

import {
	ArrowUpRight,
	ChevronRight,
	Filter,
	MapPin,
	Package,
	Plus,
	TriangleAlert,
	Truck,
} from "lucide-react";

const STATUS: Record<string, string> = {
	loading: "Em carregamento",
	waiting: "Aguardando",
	finished: "Finalizado",
	canceled: "Cancelado",
};

export function ScheduleOfTheDay() {
	return (
		<section className="space-y-6">
			<header className="flex flex-col md:flex-row gap-4 items-center justify-between">
				<div className="space-y-2">
					<h2 className="font-semibold text-xl">
						Programação de {formatBrazilianDate(new Date())}
					</h2>
					<p className="text-sm text-zinc-600">
						Acompanhe em tempo real os indicadores de carregamento
						dos veículos
					</p>
				</div>
				<Button variant="secondary" className="w-full md:w-fit">
					<Filter className="size-4" />
					Adicionar filtros
				</Button>
			</header>
			<div className="flex flex-col gap-2">
				{mockSchedule.map((schedule) => (
					<Link
						key={schedule.vehicle}
						href="/inicio"
						className="group"
					>
						<Card className="grid grid-cols-1 md:grid-cols-[170px_1fr] bg-white border group-hover:border-zinc-300 py-4">
							<CardHeader className="border-b md:border-b-0 md:border-r border-zinc-200 flex-row md:flex-col items-center justify-between md:justify-center gap-2">
								<div className="flex flex-col gap-2 items-center">
									<CardTitle>
										{formatShortcutBrazilianDate(
											new Date()
										)}
									</CardTitle>
									<CardDescription>
										<Badge
											data-status={schedule.status}
											className="data-[status=loading]:bg-app-blue-100 data-[status=loading]:text-app-blue-700 data-[status=waiting]:bg-amber-50 data-[status=waiting]:text-amber-600 data-[status=finished]:bg-emerald-50 data-[status=finished]:text-emerald-600 data-[status=canceled]:bg-rose-50 data-[status=canceled]:text-rose-600"
										>
											{STATUS[schedule.status]}
										</Badge>
									</CardDescription>
								</div>
								<Separator
									orientation="vertical"
									className="block md:hidden"
								/>
								<div className="flex flex-row md:flex-col gap-4 items-center">
									<Separator className="hidden md:block" />
									<span className="text-sm text-zinc-500 text-center max-w-[130px]">
										Última atualização às{" "}
										{schedule.lastUpdate}
									</span>
								</div>
							</CardHeader>
							<CardContent className="flex items-center justify-between mt-6 md:mt-0">
								<div className="w-full">
									<div className="w-full flex items-center justify-between gap-2">
										<strong className="text-xl text-nowrap text-ellipsis overflow-hidden">
											{schedule.driver}
										</strong>
										<Link
											href=""
											className="w-fit flex md:hidden items-center gap-2 px-3 py-1 bg-app-blue-50 text-sm rounded-full text-app-blue-600"
										>
											Ver detalhes
											<ArrowUpRight className="size-3" />
										</Link>
									</div>
									<ul className="flex flex-col gap-4 mt-6">
										<li className="flex items-center gap-2 text-sm text-zinc-600">
											<Truck className="size-4" />
											{schedule.vehicle}
										</li>
										<li className="flex items-center gap-2 text-sm text-zinc-600">
											<Package className="size-4" />
											{schedule.deliveries} entregas e{" "}
											{schedule.pickups} coletas
										</li>
										<li className="flex items-center gap-2 text-sm text-zinc-600">
											<MapPin className="size-4" />
											{schedule.route}
										</li>
										<li className="flex items-center gap-2 text-sm text-zinc-600">
											<TriangleAlert className="size-4" />
											{schedule.observation}
										</li>
									</ul>
								</div>
								<ChevronRight className="hidden md:block text-zinc-400 size-6 group-hover:translate-x-0.5 transition-transform" />
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}

const mockSchedule = [
	{
		status: "loading",
		lastUpdate: "06:33",
		driver: "Augusto Melo",
		vehicle: "BIS-1611 / Volkswagen Constellation",
		deliveries: 33,
		pickups: 2,
		route: "Cerquilho (Cerquilho, Tietê e Laranjal Paulista)",
		observation: "Nenhuma observação cadastrada.",
	},
	{
		status: "finished",
		lastUpdate: "08:15",
		driver: "Carla Souza",
		vehicle: "FTZ-2045 / Mercedes-Benz Atego",
		deliveries: 12,
		pickups: 5,
		route: "Sorocaba (Votorantim, Araçoiaba da Serra)",
		observation: "Aguardando documentação do cliente.",
	},
	{
		status: "waiting",
		lastUpdate: "10:45",
		driver: "Ricardo Lima",
		vehicle: "JPL-7788 / Scania R440",
		deliveries: 40,
		pickups: 3,
		route: "São Paulo - Curitiba",
		observation: "Parada técnica para descanso em Registro/SP.",
	},
	{
		status: "canceled",
		lastUpdate: "14:20",
		driver: "Fernando Costa",
		vehicle: "ZXC-9876 / Volvo FH",
		deliveries: 25,
		pickups: 0,
		route: "Campinas - Ribeirão Preto",
		observation: "Atraso devido a trânsito intenso na Anhanguera.",
	},
	{
		status: "finished",
		lastUpdate: "17:50",
		driver: "Mariana Ribeiro",
		vehicle: "GHK-3214 / Iveco Daily",
		deliveries: 15,
		pickups: 6,
		route: "Belo Horizonte - Contagem",
		observation: "Carga entregue sem avarias.",
	},
];

export default mockSchedule;
