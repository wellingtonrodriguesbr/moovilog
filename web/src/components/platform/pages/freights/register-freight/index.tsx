import Link from "next/link";

import { BackPageButton } from "@/components/platform/back-page-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function RegisterFreight() {
	return (
		<section>
			<header className="space-y-2">
				<BackPageButton />
				<h1 className="font-medium text-2xl">Novo frete</h1>
				<span className="block text-sm text-zinc-600">
					Escolha uma das opções abaixo:
				</span>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
				<Link href="/fretes/novo/manifesto" className="h-full">
					<Card className="h-full border bg-white">
						<CardHeader>
							<CardTitle>Cadastro por manifesto</CardTitle>
							<CardDescription>
								Cadastre um frete automaticamente enviando o
								manifesto de transporte em PDF; o sistema
								identifica o motorista, entregas, peso e demais
								informações relevantes.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>
								Continuar <ArrowRight className="size-4" />
							</Button>
						</CardFooter>
					</Card>
				</Link>

				<Link href="/fretes/novo/manual" className="h-full">
					<Card className="h-full border bg-white">
						<CardHeader>
							<CardTitle>Cadastro manual</CardTitle>
							<CardDescription>
								Cadastre um frete preenchendo manualmente todos
								os dados e informações necessárias, como
								motorista, veículo, entregas, peso total e rota.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>
								Continuar <ArrowRight className="size-4" />
							</Button>
						</CardFooter>
					</Card>
				</Link>
			</div>
		</section>
	);
}
