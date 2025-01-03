"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import ReactPlayer from "react-player";

export function PlatformDemoDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full md:w-fit text-app-cyan-500 gap-2 bg-transparent hover:bg-app-cyan-100/10">
					Ver mais detalhes
					<ChevronDown className="size-4 animate-bounce" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[350px] md:max-w-[600px] rounded-md">
				<DialogHeader>
					<DialogTitle>
						Demonstração da versão beta da plataforma
					</DialogTitle>
					<DialogDescription>
						Confira a demonstração da versão beta do Moovilog e veja
						como nossa plataforma está transformando a gestão
						logística. Explore funcionalidades exclusivas, como
						controle de pagamentos, histórico de fretes e insights
						inteligentes, tudo pensado para facilitar o dia a dia
						das transportadoras. Esta é apenas uma prévia do que
						estamos construindo para revolucionar sua operação!
					</DialogDescription>
				</DialogHeader>

				<ReactPlayer
					width="100%"
					url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
				/>
			</DialogContent>
		</Dialog>
	);
}
