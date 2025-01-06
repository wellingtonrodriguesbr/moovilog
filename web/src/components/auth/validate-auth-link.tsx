"use client";

import Link from "next/link";

import { useValidateAuthLink } from "@/hooks/use-validate-auth-link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheckBig, Loader2, X } from "lucide-react";

export function ValidateAuthLink() {
	const { isValidateAuthLinkPending, status } = useValidateAuthLink();

	return (
		<div className="w-full h-screen fixed inset-0 bg-white">
			<section className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
				<div className="w-full px-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
					{!isValidateAuthLinkPending && status === "success" ? (
						<>
							<CircleCheckBig className="size-8 md:size-10 text-app-blue-400" />
							<h1 className="text-base md:text-xl text-center">
								Validado com sucesso, estamos te
								redirecionando..
							</h1>
						</>
					) : null}

					{isValidateAuthLinkPending && status === "pending" ? (
						<>
							<Loader2 className="size-8 animate-spin text-app-blue-500" />
							<p className="text-base md:text-xl text-center">
								Validando seu código, só um momento por favor...
							</p>
						</>
					) : null}

					{!isValidateAuthLinkPending && status === "error" ? (
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-2">
								<X className="size-8 md:size-10 text-rose-400" />
								<h1 className="text-base md:text-xl">
									Código inválido
								</h1>
							</div>
							<Button asChild>
								<Link href="/">
									<ArrowLeft className="size-4" />
									Voltar ao início
								</Link>
							</Button>
						</div>
					) : null}
				</div>
			</section>
		</div>
	);
}
