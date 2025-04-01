"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { links } from "@/utils/links";
import { MessageSquareMore } from "lucide-react";
import Link from "next/link";

export function Home() {
	const { profile, isGetProfilePending } = useGetProfile();

	return (
		<section className="flex flex-col mt-4 gap-4 w-full h-[85dvh]">
			<header className="flex justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">
					{isGetProfilePending ? (
						<Skeleton className="h-8 md:h-12 w-80 md:w-[450px] rounded-lg" />
					) : (
						<>Olá, {profile?.name}</>
					)}
				</h1>
			</header>
			<div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-4">
				<h2 className="text-3xl md:text-4xl font-semibold">
					Em construção
				</h2>
				<p className="text-center max-w-xl text-zinc-600 mt-4">
					Estamos construindo a página inicial da plataforma, e logo
					vem muita novidade por aí! Enquanto isso, sinta-se à vontade
					para explorar tudo o que já está disponível. Fique de olho,
					porque estamos preparando algo que vai transformar a sua
					experiência! 😉
				</p>
				<p className="text-center max-w-sm text-zinc-600 mt-8">
					Deseja contribuir com sugestões do que gostaria de ver por
					aqui? Clique no botão abaixo
				</p>
				<Button
					className="w-full md:w-fit mt-4"
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
