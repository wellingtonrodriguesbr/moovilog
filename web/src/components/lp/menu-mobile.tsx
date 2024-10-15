import Link from "next/link";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { useUserAuthenticate } from "@/hooks/use-user-authenticate";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "../ui/button";

export function MenuMobile() {
	const { isAuthenticate } = useUserAuthenticate();

	return (
		<Drawer>
			<DrawerTrigger className="block md:hidden">
				<Menu className="size-6 text-white" />
			</DrawerTrigger>
			<DrawerContent className="px-4">
				{isAuthenticate ? (
					<Link
						className="flex items-center justify-between w-full py-4 border-b"
						href="/inicio"
					>
						Acessar plataforma
						<ArrowRight className="size-4" />
					</Link>
				) : (
					<ul className="flex flex-col">
						<li className="py-4 border-b">
							<Link href="/entrar">Entrar</Link>
						</li>
						<li className="py-4 border-b">
							<Link href="/">Demonstração gratuita</Link>
						</li>
					</ul>
				)}
				<DrawerFooter className="px-0">
					<Button asChild>
						<Link href="/cadastro">
							Criar uma conta gratuitamente
						</Link>
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
