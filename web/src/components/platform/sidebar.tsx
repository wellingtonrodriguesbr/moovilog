"use client";

import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UnfoldHorizontal } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      className="fixed md:sticky top-0 bottom-0 w-[20rem] md:w-[24rem] md:data-[state=open]:min-w-[24rem] z-50 data-[state=closed]:w-0 md:data-[state=closed]:w-16 group border-r h-screen min-h-screen transition-all group"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 absolute top-6 md:top-7 data-[state=closed]:-right-12 -right-6 md:data-[state=closed]:-right-8 md:-right-8 z-50 mr-3 md:mr-4 text-app-blue-900/80 border rounded-full bg-zinc-100">
          <UnfoldHorizontal className="size-4" />
        </button>
      </CollapsibleTrigger>

      <div className="hidden flex-col gap-12 group-data-[state=closed]:flex mt-12 px-3">
        {/* <Image src="/logo.svg" alt="Orah" width={32} height={32} /> */}
      </div>

      <CollapsibleContent className="z-40 w-full h-screen min-h-screen overflow-y-hidden md:verflow-y-auto left-0 max-w-[23rem]  bg-ora-gray-500 px-2 overflow-x-hidden">
        {/* <ScrollArea className="h-full pb-12">
          <div className="w-full flex items-center gap-2 ml-3 my-12">
            <Image src="/logo.svg" alt="" width={32} height={32} />
          </div>
        </ScrollArea> */}
      </CollapsibleContent>
    </Collapsible>
  );
}
