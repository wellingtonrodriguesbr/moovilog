"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarContent } from "./sidebar-content";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function Sidebar() {
  const { isOpen } = useOpenCloseSidebar();

  return (
    <Collapsible
      className="bg-white fixed top-20 bottom-0 w-[20rem] md:w-[20rem] md:data-[state=open]:min-w-[20rem] z-50 data-[state=closed]:w-0 md:data-[state=closed]:w-16 group border-r h-screen min-h-screen transition-all group"
      open={isOpen}
    >
      <div className="hidden flex-col gap-12 group-data-[state=closed]:flex mt-12 px-3">
        {/* <Image src="/logo-blue.svg" alt="moovilog" width={32} height={32} /> */}
      </div>

      <CollapsibleContent className="z-40 w-full h-screen min-h-screen overflow-y-hidden md:verflow-y-auto left-0 max-w-[20rem] px-4 overflow-x-hidden">
        <ScrollArea className="h-full pb-12">
          <SidebarContent />
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}
