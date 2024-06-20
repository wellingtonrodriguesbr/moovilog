import { HeaderPlatform } from "@/components/platform/header";
import { Sidebar } from "@/components/platform/sidebar";

export default function PlattformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <HeaderPlatform />
      <Sidebar />

      <div className="w-full col-span-full md:col-span-1 overflow-y-auto h-[calc(100vh-80px)] p-4 md:p-12">
        {children}
      </div>
    </main>
  );
}
