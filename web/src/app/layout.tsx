import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { cn } from "@/lib/cn";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const SidebarProvider = dynamic(() => import("@/providers/sidebar-provider"), {
	ssr: false,
});

import "./globals.css";

const sans = Fira_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Moovilog | O movimento que transforma sua gestão.",
	description:
		"Transforme a gestão da sua transportadora com uma plataforma moderna e 100% online. Centralize suas operações, substitua planilhas e otimize processos com segurança e eficiência. Acesse de qualquer lugar e tenha o controle total do seu negócio em suas mãos.",
	metadataBase: new URL("https://moovilog.com"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body
				cz-shortcut-listen="true"
				className={cn(
					"min-h-screen bg-zinc-50 text-app-blue-900 font-sans antialiased",
					sans.variable
				)}
			>
				<SidebarProvider>
					<TooltipProvider>
						<ReactQueryProvider>{children}</ReactQueryProvider>
						<Toaster
							position="top-center"
							theme="light"
							richColors
						/>
					</TooltipProvider>
				</SidebarProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
