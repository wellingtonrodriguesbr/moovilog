import { HeaderPlatform } from "@/components/platform/header-platform";
import { Sidebar } from "@/components/platform/sidebar";

export default function PlattformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Sidebar />

      <div className="w-full col-span-full md:col-span-1">
        <HeaderPlatform />
        <main className="w-full p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
