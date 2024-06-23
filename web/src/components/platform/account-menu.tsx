"use client";

import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfile } from "@/hooks/use-get-profile";
import Link from "next/link";

export function AccountMenu() {
  const { profile } = useGetProfile();
  const [firstName, lastName] = profile?.name.split(" ") ?? [];

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="border cursor-pointer" asChild>
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback className="text-xs font-semibold">
              {firstName?.at(0)}
              {lastName?.at(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 z-[999999]">
          <DropdownMenuLabel className="flex flex-col">
            <span>{profile?.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Link
                className="flex items-center gap-2 cursor-pointer"
                href="/meus-dados"
              >
                <User className="size-4" />
                Meus dados
              </Link>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400 hover:text-rose-500 hover:dark:text-rose-400"
          >
            <button className="w-full" onClick={() => {}}>
              <LogOut className="mr-2 w-4 h-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
