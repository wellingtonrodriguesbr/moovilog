import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/lp/components/header";
import { Separator } from "@/components/ui/separator";

import { links } from "@/utils/links";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { AlertCircle, ArrowUpRight, MoveDown } from "lucide-react";

export function Hero() {
	return (
		<section className="w-full min-h-screen xl:min-h-[900px] xl:h-[900px] flex flex-col bg-app-blue-500 md:bg-hero-cover bg-bottom bg-no-repeat overflow-hidden pb-12">
			<Header />
			<div className="relative w-full h-full max-w-screen-2xl mx-auto px-4 mt-14 xl:mt-20 grid grid-cols-1 xl:grid-cols-3 gap-12 md:gap-24">
				<div className="flex flex-col items-start col-span-2">
					<small className="flex items-center gap-1 text-white mb-2">
						Esqueça as planilhas
						<span className="text-lg">💨</span>
					</small>
					<h1 className="font-medium text-4xl md:text-5xl xl:text-6xl text-white leading-tight md:leading-tight xl:leading-tight">
						Uma plataforma completa para gerenciar sua
						transportadora com praticidade e eficiência.
					</h1>
					<p className="text-base md:text-lg mt-6 text-app-cyan-100 max-w-4xl">
						Diga adeus à confusão das planilhas e à papelada! Nossa
						solução te coloca no controle total do seu negócio,
						fornecendo dados precisos e insights estratégicos
						ajudando você a tomar as melhores decisões para sua
						transportadora.
					</p>
					<div className="w-full flex flex-col xl:flex-row  gap-4 mt-8">
						<Button
							className="w-full xl:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2"
							asChild
						>
							<Link href={links["waiting-list"]}>
								Entrar na lista de espera
								<ArrowUpRight className="size-4" />
							</Link>
						</Button>
						<Button variant="link" className="text-white" asChild>
							<Link href={links["whatsapp-doubts"]}>
								<WhatsappIcon className="size-4" />
								Quero tirar dúvidas no WhatsApp
							</Link>
						</Button>
					</div>
					<Separator className="max-w-[850px] h-[1px] my-8 opacity-15" />
					<h3 className="flex items-start text-app-yellow-500 gap-2 max-w-md">
						<AlertCircle className="size-4 min-w-4 min-h-4" />
						Plataforma em construção, entre na lista de espera que
						iremos te manter informado por e-mail ou WhatsApp.
					</h3>
				</div>
				<div className="hidden xl:block absolute -bottom-12 right-0">
					<Image
						src="/hero-man-img.svg"
						alt=""
						width={650}
						height={650}
						priority
						quality={100}
					/>
				</div>
				<div className="hidden md:flex absolute left-4 bottom-2 flex-col items-center justify-center text-app-cyan-500">
					<MoveDown className="size-8 animate-bounce" />
				</div>
			</div>
		</section>
	);
}
