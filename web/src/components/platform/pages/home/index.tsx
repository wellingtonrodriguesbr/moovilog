"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { links } from "@/utils/links";
import { MessageSquareMore, TriangleAlert } from "lucide-react";
import Link from "next/link";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-12 w-full h-[85dvh]">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="w-full bg-amber-50 rounded-lg flex flex-col p-4 border border-amber-200">
				<div className="flex items-center gap-2 text-amber-700">
					<TriangleAlert className="size-4" />
					<h2 className="text-xl md:text-2xl">Em construção</h2>
				</div>
				<p className="text-xs md:text-sm max-w-md text-amber-700 mt-2">
					Estamos construindo a página inicial da plataforma, e logo
					vem muita novidade por aí! Deseja contribuir com sugestões
					do que gostaria de ver por aqui? Clique no botão abaixo
				</p>
				<Button
					className="w-full md:w-fit mt-4 border-amber-700 hover:bg-amber-100 hover:text-amber-800 text-amber-700"
					variant="outline"
					asChild
				>
					<Link href={links["send-feedback"]} target="_blank">
						<MessageSquareMore className="size-4" />
						Enviar feedback
					</Link>
				</Button>
			</div>
		</section>
	);
}
