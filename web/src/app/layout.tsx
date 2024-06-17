import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

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
        {children}
      </body>
    </html>
  );
}
