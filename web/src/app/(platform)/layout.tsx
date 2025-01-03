import { HeaderPlatform } from "@/components/platform/header";
import { Sidebar } from "@/components/platform/sidebar";

export default function PlattformLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
			<Sidebar />

			<div className="w-full col-span-full md:col-span-1 overflow-y-auto h-screen">
				<HeaderPlatform />
				<main className="p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}
