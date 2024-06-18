import dynamic from "next/dynamic";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const SidebarProvider = dynamic(() => import("@/providers/sidebar-provider"), {
  ssr: false,
});

import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Moovilog | Gerencie sua operação logística com tecnologia de ponta",
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
          "min-h-screen bg-white text-app-blue-900 font-sans antialiased",
          sans.variable
        )}
      >
        <SidebarProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
