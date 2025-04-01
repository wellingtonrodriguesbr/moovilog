import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	ChevronRight,
	MapPin,
	Package,
	TriangleAlert,
	Truck,
	Undo2,
} from "lucide-react";
import Link from "next/link";

export function ScheduleOfTheDay() {
	return (
		<section className="space-y-6">
			<header className="space-y-2">
				<h2 className="font-semibold text-xl">
					Programação de 01/04/2025
				</h2>
				<p className="text-sm text-zinc-600">
					Acompanhe em tempo real os indicadores de carregamento dos
					veículos
				</p>
			</header>
			<div className="flex flex-col gap-2">
				{mockFretes.map((frete) => (
					<Link key={frete.veiculo} href="/inicio" className="group">
						<Card className="grid grid-cols-1 md:grid-cols-[170px_1fr] bg-white border group-hover:border-zinc-300 py-4">
							<CardHeader className="border-r border-zinc-200 items-center justify-center gap-2">
								<CardTitle>{frete.data}</CardTitle>
								<CardDescription>
									<Badge className="bg-app-blue-100 text-app-blue-700">
										{frete.status}
									</Badge>
								</CardDescription>
								<Separator />
								<span className="text-sm text-zinc-500 text-center">
									Última atualização às{" "}
									{frete.ultimaAtualizacao}
								</span>
							</CardHeader>
							<CardContent className="flex items-center justify-between">
								<div>
									<strong className="text-xl">
										{frete.motorista}
									</strong>
									<div className="flex flex-col gap-4 mt-6">
										<span className="flex items-center gap-2 text-sm text-zinc-600">
											<Truck className="size-4" />
											{frete.veiculo}
										</span>
										<span className="flex items-center gap-2 text-sm text-zinc-600">
											<Package className="size-4" />
											{frete.entregas} entregas e{" "}
											{frete.coletas} coletas
										</span>
										<span className="flex items-center gap-2 text-sm text-zinc-600">
											<MapPin className="size-4" />
											{frete.rota}
										</span>
										<span className="flex items-center gap-2 text-sm text-zinc-600">
											<TriangleAlert className="size-4" />
											{frete.observacao}
										</span>
									</div>
								</div>
								<ChevronRight className="text-zinc-400 size-6 group-hover:translate-x-0.5 transition-transform" />
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
}

const mockFretes = [
	{
		data: "01/04",
		status: "Em carregamento",
		ultimaAtualizacao: "06:33",
		motorista: "Augusto Melo",
		veiculo: "BIS-1611 / Volkswagen Constellation",
		entregas: 33,
		coletas: 2,
		rota: "Cerquilho (Cerquilho, Tietê e Laranjal Paulista)",
		observacao: "Nenhuma observação cadastrada.",
	},
	{
		data: "01/04",
		status: "Finalizado",
		ultimaAtualizacao: "08:15",
		motorista: "Carla Souza",
		veiculo: "FTZ-2045 / Mercedes-Benz Atego",
		entregas: 12,
		coletas: 5,
		rota: "Sorocaba (Votorantim, Araçoiaba da Serra)",
		observacao: "Aguardando documentação do cliente.",
	},
	{
		data: "01/04",
		status: "Aguardando",
		ultimaAtualizacao: "10:45",
		motorista: "Ricardo Lima",
		veiculo: "JPL-7788 / Scania R440",
		entregas: 40,
		coletas: 3,
		rota: "São Paulo - Curitiba",
		observacao: "Parada técnica para descanso em Registro/SP.",
	},
	{
		data: "01/04",
		status: "Cancelado",
		ultimaAtualizacao: "14:20",
		motorista: "Fernando Costa",
		veiculo: "ZXC-9876 / Volvo FH",
		entregas: 25,
		coletas: 0,
		rota: "Campinas - Ribeirão Preto",
		observacao: "Atraso devido a trânsito intenso na Anhanguera.",
	},
	{
		data: "01/04",
		status: "Finalizado",
		ultimaAtualizacao: "17:50",
		motorista: "Mariana Ribeiro",
		veiculo: "GHK-3214 / Iveco Daily",
		entregas: 15,
		coletas: 6,
		rota: "Belo Horizonte - Contagem",
		observacao: "Carga entregue sem avarias.",
	},
];

export default mockFretes;
