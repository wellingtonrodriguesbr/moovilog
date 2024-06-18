"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function ButtonOpenCloseSidebar() {
  const { handleOpenAndCloseSidebar, isOpen } = useOpenCloseSidebar();

  return (
    <Button
      onClick={handleOpenAndCloseSidebar}
      className="bg-zinc-100 hover:bg-zinc-100 md:hover:bg-zinc-200 text-app-blue-900"
    >
      {isOpen ? (
        <>
          <X className="block xl:hidden size-4" />
          <Menu className="hidden xl:block size-4" />
        </>
      ) : (
        <Menu className="size-4" />
      )}
    </Button>
  );
}
