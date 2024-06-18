"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarContent } from "./sidebar-content";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";
import { SidebarClosedContent } from "./sidebar-closed-content";

export function Sidebar() {
  const { isOpen } = useOpenCloseSidebar();

  return (
    <Collapsible
      className="bg-white fixed top-20 bottom-0 w-[20rem] data-[state=closed]:w-0 md:data-[state=closed]:w-20 md:data-[state=open]:min-w-[20rem] z-50 group border-r h-screen min-h-screen transition-all"
      open={isOpen}
    >
      <div className="hidden group-data-[state=closed]:block">
        <SidebarClosedContent />
      </div>

      <CollapsibleContent className="z-40 w-full h-screen min-h-screen overflow-hidden left-0 max-w-[20rem] px-4">
        <ScrollArea className="h-full pb-12">
          <SidebarContent />
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}
