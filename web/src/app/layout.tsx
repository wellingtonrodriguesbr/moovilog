import dynamic from "next/dynamic";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const SidebarProvider = dynamic(() => import("@/providers/sidebar-provider"), {
	ssr: false,
});

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Moovilog | Gerencie toda sua operação logística em uma única plataforma",
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
							position="bottom-center"
							theme="light"
							richColors
						/>
					</TooltipProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
