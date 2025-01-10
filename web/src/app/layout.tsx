import dynamic from "next/dynamic";

import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
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
	title: "Moovilog | Organize, gerencie e impulsione sua transportadora.",
	description: "",
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
			</body>
		</html>
	);
}
