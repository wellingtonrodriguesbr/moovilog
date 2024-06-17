import { Sidebar } from "@/components/platform/sidebar";

export default function PlattformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
