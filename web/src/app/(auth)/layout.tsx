import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-screen grid grid-cols-1 md:grid-cols-[450px_1fr]">
			<div className="hidden md:block w-full h-full bg-zinc-100"></div>
			<aside className="w-full h-full flex flex-col justify-center p-4 md:p-8">
				<header className="flex flex-col gap-8 mb-6">
					<Link
						href="/"
						className="flex items-center gap-2 text-sm group"
					>
						<ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
						Voltar ao início
					</Link>
					<Image
						src="/logo-blue.svg"
						alt="moovilog"
						className="w-[170px]"
						width={250}
						height={193}
					/>
				</header>
				{children}
			</aside>
		</main>
	);
}
