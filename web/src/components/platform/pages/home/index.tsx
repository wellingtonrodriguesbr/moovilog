"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Box, LayoutGrid, TriangleAlert, Truck } from "lucide-react";
import Link from "next/link";

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
				<Card className="bg-app-blue-50">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Fretes</CardTitle>
							<CardDescription>
								2 fretes programados para hoje
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-app-blue-200">
							<LayoutGrid className="size-6 text-app-blue-500" />
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-emerald-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Coletas</CardTitle>
							<CardDescription>
								4 coletas programadas para hoje
							</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-emerald-200">
							<Box className="size-6 text-emerald-500" />
						</div>
					</CardHeader>
				</Card>
				<Card className="bg-amber-100">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Avisos</CardTitle>
							<CardDescription>
								5 avisos registrados.{" "}
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
				<Card className="bg-violet-50">
					<CardHeader className="flex justify-between flex-row items-center">
						<div className="space-y-1">
							<CardTitle>Veículos</CardTitle>
							<CardDescription>2 veículos na rua</CardDescription>
						</div>
						<div className="flex items-center justify-center size-12 rounded-md bg-violet-200">
							<Truck className="size-6 text-violet-500" />
						</div>
					</CardHeader>
				</Card>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
				<Card className="h-48"></Card>
				<Card className="h-48"></Card>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-[1fr_400px_400px] gap-4 pb-8">
				<Card className="h-80"></Card>
				<Card className="h-80"></Card>
				<Card className="h-80"></Card>
			</div>
		</section>
	);
}
