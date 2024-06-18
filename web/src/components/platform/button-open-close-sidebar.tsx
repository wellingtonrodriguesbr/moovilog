"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function ButtonOpenCloseSidebar() {
  const { handleOpenAndCloseSidebar } = useOpenCloseSidebar();

  return (
    <Button
      onClick={handleOpenAndCloseSidebar}
      className="bg-zinc-100 hover:bg-zinc-200 text-app-blue-900"
    >
      <Menu className="size-4" />
    </Button>
  );
}
