import { AccountMenu } from "@/components/platform/account-menu";
import { ButtonOpenCloseSidebar } from "@/components/platform/button-open-close-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbPlatform } from "@/components/platform/breadcrumb-platform";

import { CircleHelp, MessageSquareMore } from "lucide-react";
import Image from "next/image";

export function HeaderPlatform() {
	return (
		<header className="col-span-full h-16 px-4 border-b sticky top-0 left-0 right-0 flex justify-between items-center bg-white">
			<div className="flex items-center gap-2">
				<Image
					src="/moovilog-icon-blue.svg"
					alt="moovilog"
					width={250}
					height={193}
					className="w-[35px] block md:hidden"
				/>
				<ButtonOpenCloseSidebar />
				<Separator
					className=" bg-zinc-200 h-4"
					orientation="vertical"
				/>
				<BreadcrumbPlatform />
			</div>

			<div className="flex items-center gap-4">
				<Button className="hidden md:flex" variant="ghost">
					<CircleHelp className="size-4" />
					Preciso de ajuda
				</Button>
				<Button className="hidden md:flex" variant="outline">
					<MessageSquareMore className="size-4" />
					Enviar feedback
				</Button>
				<AccountMenu />
			</div>
		</header>
	);
}
