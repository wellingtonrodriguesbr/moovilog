"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { useGetProfile } from "@/hooks/user/use-get-profile";
import { useLogout } from "@/hooks/auth/use-logout";

import {
	Building,
	Building2,
	CircleHelp,
	Loader2,
	LogOut,
	MessageSquareMore,
	User,
} from "lucide-react";
import { links } from "@/utils/links";
import { useGetCompanyInformation } from "@/hooks/company/use-get-company-information";
import { formatCNPJ } from "@/utils/format-cnpj";

export function AccountMenu() {
	const { companyInformation } = useGetCompanyInformation();
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
					className="flex items-center gap-2 data-[disabled=true]:pointer-events-none cursor-pointer group"
					disabled={path?.includes("/cadastro")}
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
					<DropdownMenuLabel className="flex items-center gap-2">
						<User className="size-5" />
						<div className="flex flex-col">
							<span className="block text-nowrap text-ellipsis max-w-[170px] overflow-hidden">
								{profile?.name}
							</span>
							<span className="text-xs font-normal text-muted-foreground block text-nowrap text-ellipsis max-w-[170px] overflow-hidden">
								{profile?.email}
							</span>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator className="md:hidden" />
					<DropdownMenuLabel className="flex items-center gap-2 md:hidden">
						<Building2 className="size-5" />
						<div className="flex flex-col">
							<span className="block text-nowrap text-ellipsis max-w-[170px] overflow-hidden">
								{companyInformation?.name}
							</span>
							<span className="text-xs font-normal text-muted-foreground">
								{formatCNPJ(
									companyInformation?.documentNumber ?? ""
								)}
							</span>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="hover:bg-zinc-100" asChild>
						<Link
							className="gap-2 cursor-pointer"
							href="/meu-perfil"
						>
							<User className="size-4" />
							Meu perfil
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
