"use client";

import { ScrollArea } from "../ui/scroll-area";
import { SidebarContent } from "./sidebar-content";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function Sidebar() {
  const { isOpen } = useOpenCloseSidebar();

  return (
    <aside
      data-state={isOpen ? "open" : "closed"}
      className="bg-white flex items-center h-screen md:h-full fixed top-20 md:top-0 md:relative border-r transition-all ease-in-out duration-300 data-[state=closed]:w-0 md:data-[state=closed]:w-14 w-full md:w-[15rem] overflow-hidden group z-50"
    >
      <ScrollArea className="mt-6 w-full h-full pb-12">
        <SidebarContent />
      </ScrollArea>
    </aside>
  );
}
