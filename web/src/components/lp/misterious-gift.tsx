"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";

import { ArrowUpRight, Gift, Mouse, MousePointerClick } from "lucide-react";
import { useState } from "react";

export function MisteriousGift() {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-32 md:mt-52 overflow-hidden">
			<div
				data-open={open}
				onClick={() => setOpen(!open)}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onMouseDown={() => setOpen(false)}
				className="w-full absolute left-1/2 -translate-x-1/2 bottom-0 h-20 data-[open=true]:h-72 md:data-[open=true]:h-64 overflow-hidden transition-all max-w-2xl mx-auto bg-app-blue-500"
			>
				<header className="flex items-center gap-4 h-20 border-b border-white/20">
					<div className="w-20 flex items-center justify-center h-full border-r border-white/20">
						<Gift className="size-6 text-app-cyan-500" />
					</div>
					<div className="flex flex-col gap-1 text-white">
						<h6 className="text-base md:text-lg">
							R$1 real ou um presente misterioso?
						</h6>
						<span className="hidden md:flex items-center gap-1 text-sm text-app-cyan-100">
							<Mouse className="size-4" />
							Passe o mouse e descubra
						</span>
						<span className="flex md:hidden items-center gap-1 text-sm text-app-cyan-100">
							<MousePointerClick className="size-4" />
							Clique e descubra
						</span>
					</div>
				</header>
				<div className="text-white p-4">
					<p className="text-sm md:text-base">
						A nossa plataforma será lançada em breve e você terá
						acesso gratuito para testar a versão beta por tempo
						indeterminado. Entre na lista de espera e ganhe seu
						presente misterioso. Iremos te manter informado(a) por
						e-mail ou WhatsApp.
					</p>
					<Button
						className="w-full bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 mt-4"
						asChild
					>
						<Link href={links["waiting-list"]}>
							<span className="hidden md:block">
								Entrar na lista de espera e ganhar meu acesso
								gratuito
							</span>
							<span className="block md:hidden">
								Ganhar meu acesso gratuito
							</span>
							<ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
