import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FooterSocialMedia } from "@/components/footer-social-media";
import { MisteriousGift } from "@/components/lp/misterious-gift";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

import { links } from "@/utils/links";
import { ArrowUpRight, Zap } from "lucide-react";

export function Footer() {
	return (
		<footer className="relative flex flex-col justify-between bg-app-blue-600 md:bg-footer-cover pt-12 mt-48">
			<MisteriousGift />
			<div className="w-full max-w-screen-2xl mx-auto px-4 flex flex-col-reverse gap-8 md:gap-4 md:flex-row justify-between">
				<div className="max-w-xl text-white">
					<small className="flex items-center gap-2 text-app-cyan-100">
						<Zap className="size-4 fill-app-cyan-100" />
						Organizar, para gerenciar, para decolar.
					</small>
					<h6 className="text-3xl md:text-5xl leading-normal md:leading-tight font-semibold mt-3">
						A solução que faltava para a gestão eficiente da sua
						transportadora.
					</h6>
					<p className="mt-4 opacity-80">
						Movimento é vida: assim como o corpo precisa se manter
						ativo para prosperar, a gestão eficiente de um negócio
						depende de processos ágeis e dinâmicos, garantindo
						crescimento e resultados sustentáveis.
					</p>
					<Button
						className="w-full xl:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2 mt-8"
						asChild
					>
						<Link href={links["waiting-list"]}>
							Quero transformar minha gestão
							<ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
				<div>
					<Image
						src="/logo.svg"
						alt="moovilog"
						className="w-[170px]"
						width={250}
						height={193}
					/>
					<cite className="text-xs block mt-4 max-w-[10rem] text-zinc-200">
						O movimento que transforma sua gestão.
					</cite>
				</div>
			</div>

			<div className="py-6 mt-12 border-t border-white/15 w-full flex-1 max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
				<div className="flex items-center gap-4">
					<ScrollToTopButton />
					<span className="text-sm md:text-base flex-1 text-white">
						© Copyright 2024 - Moovilog - Todos os direitos
						reservados.
					</span>
				</div>
				<FooterSocialMedia />
			</div>
		</footer>
	);
}
