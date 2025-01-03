"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { useLogout } from "@/hooks/use-logout";

import { Building, Loader2, LogOut, User } from "lucide-react";

export function AccountMenu() {
	const router = useRouter();
	const { profile } = useGetProfile();
	const { logout, isPendingLogout } = useLogout();

	const [firstName, lastName] = profile?.name.split(" ") ?? [];

	async function handleLogout() {
		await logout();
		router.push("/entrar");
	}

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="flex items-center gap-2 cursor-pointer"
					asChild
				>
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
						<DropdownMenuItem className="hover:bg-zinc-100" asChild>
							<Link
								className="flex items-center gap-2 cursor-pointer"
								href="/meus-dados"
							>
								<User className="size-4" />
								Meus dados
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem className="hover:bg-zinc-100" asChild>
							<Link
								className="flex items-center gap-2 cursor-pointer"
								href="/minha-empresa/dados-cadastrais"
							>
								<Building className="size-4" />
								Empresa
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						asChild
						className="text-rose-500 hover:text-rose-500 hover:bg-rose-50 rounded-sm cursor-pointer"
					>
						<button className="w-full" onClick={handleLogout}>
							{isPendingLogout ? (
								<Loader2 className="mr-2 size-4 animate-spin" />
							) : (
								<LogOut className="mr-2 size-4" />
							)}
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Dialog>
	);
}
