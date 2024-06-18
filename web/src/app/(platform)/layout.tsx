import { HeaderPlatform } from "@/components/platform/header";
import { Sidebar } from "@/components/platform/sidebar";

export default function PlattformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen">
      <HeaderPlatform />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
