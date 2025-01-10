import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/lp/header";

import { PlatformDemoDialog } from "@/components/lp/platform-demo-dialog";
import { links } from "@/utils/links";
import { ArrowRight } from "lucide-react";
import { WhatsappIcon } from "../icons/whatsapp-icon";

export function Hero() {
	return (
		<section className="relative w-full min-h-screen flex flex-col bg-app-blue-500">
			<Header />
			<div className="flex-1 w-full h-full max-w-screen-xl mx-auto px-4 mt-14 xl:mt-20 grid grid-cols-1 gap-12 md:gap-24">
				<div className="flex flex-col items-center">
					<small className="flex items-center gap-1 text-white mb-2">
						Esqueça as planilhas e transforme sua gestão hoje
						<span className="text-lg">💨</span>
					</small>
					<h1 className="text-center font-bold text-4xl md:text-5xl xl:text-6xl text-white leading-tight md:leading-tight xl:leading-tight">
						Uma plataforma completa para gerenciar sua
						transportadora com praticidade e eficiência.
					</h1>
					<p className="text-center text-sm md:text-base mt-6 text-app-cyan-100 max-w-screen-md">
						Transforme a gestão da sua transportadora com nossa
						plataforma completa. Diga adeus à confusão das planilhas
						e abrace uma solução que oferece controle total e
						praticidade. Estamos prontos para crescer junto com você
					</p>
					<div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 mt-8">
						<Button
							className="w-full xl:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2"
							asChild
						>
							<Link href={links["request-demo"]}>
								<WhatsappIcon className="size-4 fill-app-blue-900" />
								Solicitar uma demonstração gratuita
							</Link>
						</Button>
						<PlatformDemoDialog />
					</div>
				</div>
				<div className="flex items-center justify-end bg-white/20 rounded-t-xl mt-auto overflow-hidden p-2 xl:p-3">
					<Image
						src="/platform-home.svg"
						alt=""
						className="rounded-t-md"
						width={1920}
						height={1080}
						priority
						quality={100}
						objectFit="cover"
					/>
				</div>
			</div>
		</section>
	);
}
