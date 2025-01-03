import Image from "next/image";

import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/lp/header";

import { PlatformDemoDialog } from "@/components/lp/platform-demo-dialog";

export function Hero() {
	return (
		<section className="relative w-full overflow-hidden min-h-screen md:h-[1000px] md:min-h-[1000px] xl:h-[800px] xl:min-h-[800px] xl:max-h-[800px] flex flex-col bg-app-blue-500">
			<Header />
			<div className="relative w-full h-full max-w-screen-2xl mx-auto px-4 mt-12 md:mt-16 xl:mt-36 grid grid-cols-1 xl:grid-cols-2">
				<div>
					<span className="flex items-center gap-1 text-white text-xs mb-2">
						Esqueça as planilhas <span className="text-xl">💨</span>
					</span>
					<h1 className="font-bold text-4xl md:text-5xl xl:text-6xl text-white leading-tight md:leading-tight xl:leading-tight">
						Gerencie toda sua operação logística em uma única
						plataforma.
					</h1>
					<p className="text-sm md:text-base mt-6 text-app-cyan-100 max-w-[700px]">
						Imagine poder abandonar as dezenas de planilhas e a
						falta de controle, centralizando toda a gestão da sua
						transportadora em um só lugar. Temos a solução ideal
						para transportadoras que trabalham com agregados,
						oferecendo uma plataforma completa e intuitiva para
						transformar sua operação logística.
					</p>
					<div className="flex flex-col xl:flex-row items-center md:items-start xl:items-center gap-4 mt-8">
						<Button className="w-full md:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2">
							<WhatsappIcon className="size-4 fill-app-blue-900" />
							Solicite uma demonstração gratuita
						</Button>
						<PlatformDemoDialog />
					</div>
				</div>
				<div className="relative md:absolute md:right-12 xl:right-0 -bottom-10 md:-bottom-16 z-50">
					<Image
						src="/hero.png"
						alt=""
						className="z-50 w-[520px] xl:w-[580px]"
						width={580}
						height={749}
						quality={100}
					/>
				</div>
			</div>
			<Image
				src="/bg-hero.svg"
				alt=""
				className="absolute right-0 bottom-0 md:-bottom-10 w-[520px] xl:w-[580px] z-10"
				width={580}
				height={749}
				quality={100}
			/>
			<Image
				src="/bg-hero.svg"
				alt=""
				className="hidden xl:block absolute right-80 bottom-20 w-[520px] xl:w-[580px] z-10"
				width={580}
				height={749}
				quality={100}
			/>
		</section>
	);
}
