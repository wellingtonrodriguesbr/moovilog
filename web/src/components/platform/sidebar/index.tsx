"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarContent } from "@/components/platform/sidebar/sidebar-content";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function Sidebar() {
	const { isOpen } = useOpenCloseSidebar();

	return (
		<aside
			data-state={isOpen ? "open" : "closed"}
			className="bg-white flex items-center h-[100dvh] fixed top-16 md:top-0 md:relative border-r transition-all ease-in-out duration-300 data-[state=closed]:w-0 md:data-[state=closed]:w-16 w-full md:w-[15rem] group z-50"
		>
			<ScrollArea className="w-full h-full overflow-y-auto pt-4 pb-28 md:pb-12">
				<SidebarContent />
			</ScrollArea>
		</aside>
	);
}
