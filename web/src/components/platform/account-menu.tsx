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

export function AccountMenu() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="border-2 border-zinc-300 cursor-pointer"
          asChild
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/wellingtonrodriguesbr.png"
              alt="@shadcn"
            />
            <AvatarFallback>WR</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 z-[999999]">
          <DropdownMenuLabel className="flex flex-col">
            <span>Wellington Rodrigues</span>
            <span className="text-xs font-normal text-muted-foreground">
              wellington@moovilog.com
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <User className="mr-2 w-4 h-4" />
              <span>Meu perfil</span>
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
