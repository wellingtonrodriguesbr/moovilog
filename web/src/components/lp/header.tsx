"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { ArrowRight, User } from "lucide-react";
import { MenuMobile } from "./menu-mobile";
import { useUserAuthenticate } from "@/hooks/use-user-authenticate";

export function Header() {
	const { isAuthenticate } = useUserAuthenticate();

	return (
		<header className="w-full max-w-screen-2xl mx-auto flex sticky-0 z-50 items-end md:items-center justify-between px-4 pt-12">
			<Image
				src="/logo.svg"
				alt="moovilog"
				className="w-[150px] md:w-[200px]"
				width={250}
				height={193}
				priority
			/>
			<MenuMobile />
			<div className="hidden md:flex items-center gap-4">
				{isAuthenticate ? (
					<Button
						variant="outline"
						className="text-white border-white font-bold gap-2"
						asChild
					>
						<Link href="/inicio">
							Acessar plataforma
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				) : (
					<>
						<Button
							variant="link"
							className="text-white font-bold gap-2"
							asChild
						>
							<Link href="/entrar">
								<User className="size-4" />
								Entrar
							</Link>
						</Button>
						<Button
							variant="outline"
							className="text-white border-white font-bold gap-2"
							asChild
						>
							<Link href="/cadastro">
								Criar minha conta
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</>
				)}
			</div>
		</header>
	);
}
