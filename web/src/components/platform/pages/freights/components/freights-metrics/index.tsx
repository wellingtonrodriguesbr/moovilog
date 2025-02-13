import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function FreightsMetrics() {
	return (
		<section className="w-full h-full flex flex-col gap-4">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				<Card className="h-48 bg-app-blue-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="h-48 bg-app-blue-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="col-span-1 md:col-span-2 xl:col-span-1 h-48 bg-app-blue-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2"></CardTitle>
						<CardDescription className="text-zinc-600"></CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>

				<Card className="col-span-1 md:col-span-2 xl:col-span-1 h-48 bg-app-blue-50">
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
