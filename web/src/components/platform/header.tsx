import { AccountMenu } from "@/components/platform/account-menu";
import { ButtonOpenCloseSidebar } from "@/components/platform/button-open-close-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbPlatform } from "@/components/platform/breadcrumb-platform";

import { Info, MessageSquareMore } from "lucide-react";

export function HeaderPlatform() {
	return (
		<header className="col-span-full h-16 px-4 border-b sticky top-0 left-0 right-0 flex justify-between items-center bg-white">
			<div className="flex items-center gap-2">
				<ButtonOpenCloseSidebar />
				<Separator
					className=" bg-zinc-200 h-6"
					orientation="vertical"
				/>
				<BreadcrumbPlatform />
			</div>

			<div className="flex items-center gap-4">
				<Button className="hidden md:flex" variant="ghost">
					<Info className="size-4" />
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
