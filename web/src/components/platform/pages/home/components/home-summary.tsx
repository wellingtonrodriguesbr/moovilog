import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function HomeSummary() {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-2xl">Resumo do dia</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<Card className="bg-white border relative before:absolute before:inset-0 before:w-1.5 before:bg-app-blue-500 overflow-hidden">
					<CardHeader>
						<CardTitle>Entregas</CardTitle>
						<CardDescription>92 entregas no total</CardDescription>
					</CardHeader>
				</Card>
				<Card className="bg-white border relative before:absolute before:inset-0 before:w-1.5 before:bg-app-blue-500 overflow-hidden">
					<CardHeader>
						<CardTitle>Coletas</CardTitle>
						<CardDescription>20 coletas no total</CardDescription>
					</CardHeader>
				</Card>
				<Card className="bg-white border relative before:absolute before:inset-0 before:w-1.5 before:bg-app-blue-500 overflow-hidden">
					<CardHeader>
						<CardTitle>Veículos</CardTitle>
						<CardDescription>8 veículos no total</CardDescription>
					</CardHeader>
				</Card>
				<Card className="bg-white border relative before:absolute before:inset-0 before:w-1.5 before:bg-app-blue-500 overflow-hidden">
					<CardHeader>
						<CardTitle>Peso total carregado</CardTitle>
						<CardDescription>25.000kg</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
