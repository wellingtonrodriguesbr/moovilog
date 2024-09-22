import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

export function QuickAccess() {
	return (
		<section className="w-full">
			<h2 className="text-xl mb-4 text-zinc-700">Acesso rápido</h2>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				<Card
					className="relative overflow-hidden sm:col-span-2"
					x-chunk="dashboard-05-chunk-0"
				>
					<CardHeader className="pb-3">
						<CardTitle>Fretes</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">
							Cadastre fretes rapidamente por este atalho
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button className="gap-2">
							<Plus className="size-4" />
							Novo frete
						</Button>
					</CardFooter>
					<Image
						src="/truck-card.svg"
						className="w-[300px] absolute -right-10 opacity-5 -top-20 bottom-0"
						alt=""
						width={532}
						height={499}
					/>
				</Card>
				<Card x-chunk="dashboard-05-chunk-1">
					<CardHeader className="pb-2">
						<CardDescription>
							Total de custos com fretes esta semana
						</CardDescription>
						<CardTitle className="text-4xl">R$ 1.329,96</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs text-muted-foreground">
							+25% comparado a semana passada
						</div>
					</CardContent>
					<CardFooter>
						<Progress value={25} aria-label="25% increase" />
					</CardFooter>
				</Card>
				<Card x-chunk="dashboard-05-chunk-2">
					<CardHeader className="pb-2">
						<CardDescription>
							Total de custos com fretes este mês
						</CardDescription>
						<CardTitle className="text-4xl">R$ 5.329,09</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs text-muted-foreground">
							+10% comparado ao mês passado
						</div>
					</CardContent>
					<CardFooter>
						<Progress value={12} aria-label="12% increase" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
