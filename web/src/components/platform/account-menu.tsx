"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

import {
	Building,
	CircleHelp,
	Loader2,
	LogOut,
	MessageSquareMore,
	User,
} from "lucide-react";
import { links } from "@/utils/links";

export function AccountMenu() {
	const router = useRouter();
	const path = usePathname();

	const { profile } = useGetProfile();
	const { logout, isPendingLogout } = useLogout();

	const [firstName, lastName] = profile?.name.split(" ") ?? [];

	async function handleLogout() {
		await logout();
		window.location.href = "/entrar";
	}

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="flex items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=false]:cursor-pointer group"
					disabled={path.includes("/cadastro")}
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
					<DropdownMenuItem className="hover:bg-zinc-100" asChild>
						<Link
							className="gap-2 cursor-pointer"
							href="/meus-dados"
						>
							<User className="size-4" />
							Meus dados
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-zinc-100" asChild>
						<Link
							className="gap-2 cursor-pointer"
							href="/dados-cadastrais"
						>
							<Building className="size-4" />
							Dados da empresa
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex xl:hidden hover:bg-zinc-100"
						asChild
					>
						<Link
							className="gap-2 cursor-pointer"
							href={links["send-feedback"]}
							target="_blank"
						>
							<MessageSquareMore className="size-4" />
							Enviar feedback
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex xl:hidden hover:bg-zinc-100"
						asChild
					>
						<Link
							className="gap-2 cursor-pointer"
							href={links["contact-us"]}
						>
							<CircleHelp className="size-4" />
							Preciso de ajuda
						</Link>
					</DropdownMenuItem>
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
