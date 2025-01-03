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
			<h2 className="text-xl mb-4 text-zinc-700">Acesso rápido</h2>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>

			<div className="grid gap-4 grid-cols-1">
				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="h-48">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
		</section>
	);
}
