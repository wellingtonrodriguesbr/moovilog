"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UnfoldHorizontal } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      className="bg-zinc-50 fixed md:sticky top-0 bottom-0 w-[20rem] md:w-[20rem] md:data-[state=open]:min-w-[20rem] z-50 data-[state=closed]:w-0 md:data-[state=closed]:w-16 group border-r h-screen min-h-screen transition-all group"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 absolute top-6 md:top-7 data-[state=closed]:-right-12 -right-6 md:data-[state=closed]:-right-8 md:-right-8 z-50 mr-3 md:mr-4 text-app-blue-900/80 border rounded-full bg-zinc-100">
          <UnfoldHorizontal className="size-4" />
        </button>
      </CollapsibleTrigger>

      <div className="hidden flex-col gap-12 group-data-[state=closed]:flex mt-12 px-3">
        {/* <Image src="/logo-blue.svg" alt="moovilog" width={32} height={32} /> */}
      </div>

      <CollapsibleContent className="z-40 w-full h-screen min-h-screen overflow-y-hidden md:verflow-y-auto left-0 max-w-[20rem] px-4 overflow-x-hidden">
        <ScrollArea className="h-full pb-12">
          <Image
            src="/logo-blue.svg"
            alt="moovilog"
            className="w-[200px] mt-9"
            width={250}
            height={193}
          />

          <SidebarContent />
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}
