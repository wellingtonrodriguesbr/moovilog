import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { links } from "@/utils/links";

export function Header() {
	return (
		<header className="w-full max-w-screen-2xl mx-auto flex sticky-0 z-50 items-center justify-between px-4 pt-12">
			<Image
				src="/logo.svg"
				alt="moovilog"
				className="w-[150px] md:w-[200px]"
				width={250}
				height={193}
				priority
			/>
			<div className="flex items-center gap-2">
				{/* <Button variant="link" className="text-white" asChild>
					<Link href="/entrar">
						<User className="size-4" />
						Entrar
					</Link>
				</Button> */}

				<Button
					variant="outline"
					className="text-white border-white hover:bg-app-cyan-100 hover:border-transparent font-bold gap-2"
					asChild
				>
					<Link href={links["waiting-list"]}>
						Lista de espera
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</div>
		</header>
	);
}
