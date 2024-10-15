import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-screen grid grid-cols-1 md:grid-cols-[1fr_500px]">
			<div className="hidden md:block w-full h-full bg-zinc-100"></div>
			<article className="w-full h-full flex flex-col justify-center p-4 md:p-8">
				<header className="mb-6">
					<Link href="/">
						<Image
							src="/moovilog-icon-blue.svg"
							alt="moovilog"
							className="w-[70px]"
							width={250}
							height={193}
						/>
					</Link>
				</header>
				{children}
			</article>
		</main>
	);
}
