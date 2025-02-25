import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function QuickAccess() {
	return (
		<section className="w-full space-y-4">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Cadastrar frete
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Cadastrar coleta
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="col-span-1 md:col-span-2 xl:col-span-1 row-span-2 min-h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Fretes programados para hoje
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Programação do dia
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							Avisos
						</CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
		</section>
	);
}
