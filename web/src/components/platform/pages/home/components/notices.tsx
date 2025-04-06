import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";

const NOTICE_TYPES: Record<string, string> = {
	notice: "Aviso",
	alert: "Alerta",
	important: "Importante",
	update: "Atualização",
	attention: "Atenção",
};

export function Notices() {
	return (
		<section className="space-y-6">
			<header className="flex flex-col md:flex-row gap-4 items-center justify-between">
				<div className="space-y-2">
					<h2 className="font-semibold text-xl">
						Avisos importantes
					</h2>
					<p className="text-sm text-zinc-600">
						Confira os avisos mais recentes e mantenha-se
						atualizado(a).
					</p>
				</div>
				<Button variant="secondary" className="w-full md:w-fit ">
					<Eye className="size-4" />
					Ver todos
				</Button>
			</header>
			<ul className="flex flex-col gap-2">
				{notices.map((notice) => (
					<li key={notice.message}>
						<Card className="bg-white border relative before:absolute before:inset-0 before:w-1 before:bg-app-blue-500 overflow-hidden">
							<CardHeader>
								<CardTitle className="text-md">
									{notice.message}
								</CardTitle>
								<CardDescription>
									Data de criação: {notice.createdAt}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-x-2">
								<Badge
									data-type={notice.type}
									className="data-[type=alert]:bg-rose-50 data-[type=alert]:text-rose-500 data-[type=attention]:bg-amber-50 data-[type=attention]:text-amber-500 data-[type=notice]:bg-zinc-100 data-[type=notice]:text-zinc-500 data-[type=update]:bg-emerald-50 data-[type=update]:text-emerald-500 data-[type=important]:bg-violet-50 data-[type=important]:text-violet-500 pointer-events-none"
								>
									{NOTICE_TYPES[notice.type]}
								</Badge>
								<Badge className="bg-app-blue-50 text-app-blue-500 pointer-events-none">
									{notice.createdBy}
								</Badge>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
		</section>
	);
}

const notices = [
	{
		createdAt: "02/04/2025 às 08:32",
		createdBy: "Gerente Operacional",
		type: "important",
		message:
			"Manutenção preventiva agendada para os veículos da frota nesta sexta-feira.",
	},
	{
		createdAt: "02/04/2025 às 11:17",
		createdBy: "Equipe Financeira",
		type: "attention",
		message:
			"Prazo para envio dos relatórios de viagem encerra-se amanhã às 18h.",
	},
	{
		createdAt: "02/04/2025 às 12:01",
		createdBy: "Setor de Segurança",
		type: "alert",
		message:
			"Novo protocolo de segurança para carregamento e descarregamento foi implementado.",
	},
	{
		createdAt: "02/04/2025 às 12:05",
		createdBy: "Coordenação de Transporte",
		type: "important",
		message:
			"Motoristas devem revisar a documentação dos fretes antes de iniciar a viagem.",
	},
	{
		createdAt: "02/04/2025 às 14:47",
		createdBy: "Equipe de TI",
		type: "update",
		message:
			"Agora é possível registrar despesas diretamente no painel financeiro.",
	},
	{
		createdAt: "02/04/2025 às 16:59",
		createdBy: "RH",
		type: "attention",
		message:
			"Treinamento obrigatório para novos motoristas será realizado na próxima segunda-feira.",
	},
	{
		createdAt: "02/04/2025 às 17:00",
		createdBy: "Gerente de Operações",
		type: "notice",
		message:
			"Verifique a disponibilidade de veículos antes de cadastrar um novo frete.",
	},
	{
		createdAt: "02/04/2025 às 17:15",
		createdBy: "Equipe de TI",
		type: "alert",
		message:
			"Falha temporária na integração com rastreamento GPS, equipe técnica já está trabalhando na solução.",
	},
	{
		createdAt: "02/04/2025 às 18:00",
		createdBy: "Setor de Segurança",
		type: "important",
		message:
			"Reforçamos a importância do uso correto dos EPIs durante as operações de carga e descarga.",
	},
	{
		createdAt: "02/04/2025 às 20:13",
		createdBy: "Equipe Comercial",
		type: "notice",
		message:
			"Novos clientes cadastrados devem ser validados pelo setor operacional antes do primeiro frete.",
	},
];
