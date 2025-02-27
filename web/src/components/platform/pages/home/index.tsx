"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Box,
	LayoutGrid,
	PackageCheck,
	TriangleAlert,
	Trophy,
} from "lucide-react";
import { AreaChartComponent } from "./components/home-metrics/area-chart";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-8 w-full h-[85vh]">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				<Card className="bg-sky-50 border border-sky-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Entregas</CardTitle>
							<CardDescription>
								62 programadas para hoje
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-sky-200">
							<PackageCheck className="size-6 text-sky-500" />
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-emerald-50 border border-emerald-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Coletas</CardTitle>
							<CardDescription>
								12 programadas para hoje
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-emerald-200">
							<Box className="size-6 text-emerald-500" />
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-violet-50 border border-violet-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Fretes</CardTitle>
							<CardDescription>
								8 no total para hoje
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-violet-200">
							<LayoutGrid className="size-6 text-violet-500" />
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-amber-50 border border-amber-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Avisos</CardTitle>
							<CardDescription>
								5 registrados.{" "}
								<Link
									href="/operacional/avisos"
									className="underline"
								>
									Clique aqui para ver
								</Link>
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-amber-200">
							<TriangleAlert className="size-6 text-amber-500" />
						</div>
					</CardHeader>
				</Card>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
				<Card className="bg-white border">
					<CardHeader>
						<CardTitle>Ranking dos colaboradores</CardTitle>
						<CardDescription>
							Que mais carregaram veículos no mês atual
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="flex flex-col gap-2">
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-400" />
								Wellington Rodrigues
								<strong className="text-app-blue-500 ml-auto">
									45
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-zinc-500" />
								Leandro Lopes
								<strong className="text-app-blue-500 ml-auto">
									42
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-700" />
								Albano Cunha Júnior
								<strong className="text-app-blue-500 ml-auto">
									37
								</strong>
							</li>
						</ul>
					</CardContent>
				</Card>
				<Card className="bg-white border">
					<CardHeader>
						<CardTitle>Ranking dos veículos</CardTitle>
						<CardDescription>
							Veículos mais utilizados no mês atual
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="flex flex-col gap-2">
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-400" />
								ABC-1111
								<strong className="text-app-blue-500 ml-auto">
									45
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-zinc-500" />
								ABC-2222
								<strong className="text-app-blue-500 ml-auto">
									42
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-700" />
								ABC-3333
								<strong className="text-app-blue-500 ml-auto">
									37
								</strong>
							</li>
						</ul>
					</CardContent>
				</Card>
				<Card className="bg-white border">
					<CardHeader>
						<CardTitle>Ranking dos motoristas</CardTitle>
						<CardDescription>
							Motoristas que mais fizeram frete no mês atual
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="flex flex-col gap-2">
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-400" />
								Cicero Rodrigues
								<strong className="text-app-blue-500 ml-auto">
									45
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-zinc-500" />
								Benedito Arruda
								<strong className="text-app-blue-500 ml-auto">
									42
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-700" />
								Donizete Silva
								<strong className="text-app-blue-500 ml-auto">
									37
								</strong>
							</li>
						</ul>
					</CardContent>
				</Card>
				<Card className="bg-white border">
					<CardHeader>
						<CardTitle>Ranking das cidades</CardTitle>
						<CardDescription>
							Cidades mais atendidas no mês atual
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="flex flex-col gap-2">
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-400" />
								Itapetininga
								<strong className="text-app-blue-500 ml-auto">
									45
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-zinc-500" />
								Boituva
								<strong className="text-app-blue-500 ml-auto">
									42
								</strong>
							</li>
							<li className="py-2 px-4 bg-zinc-50 rounded-md flex gap-2 items-center">
								<Trophy className="size-4 text-amber-700" />
								Tatuí
								<strong className="text-app-blue-500 ml-auto">
									37
								</strong>
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
			<footer className="pb-8">
				<AreaChartComponent />
			</footer>
		</section>
	);
}
