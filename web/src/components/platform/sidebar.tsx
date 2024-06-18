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
      className="bg-white h-screen md:h-full fixed top-[72px] md:top-0 md:relative flex flex-col p-4 border-r transition-all ease-in-out duration-300 data-[state=closed]:p-0 data-[state=closed]:w-0 md:data-[state=closed]:w-20 md:data-[state=closed]:py-4 w-[20rem] overflow-hidden group"
      open={isOpen}
    >
      <div className="hidden group-data-[state=closed]:block">
        <SidebarClosedContent />
      </div>

      <CollapsibleContent>
        <ScrollArea className="bg-white h-full pb-12">
          <SidebarContent />
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}
