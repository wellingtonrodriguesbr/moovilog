import { AccountMenu } from "./account-menu";
import { ButtonOpenCloseSidebar } from "./button-open-close-sidebar";
import { Button } from "@/components/ui/button";
import { Info, MessageSquareMore } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbPlatform } from "@/components/platform/breadcrumb-platform";

export function HeaderPlatform() {
	return (
		<header className="col-span-full h-16 px-4 border-b flex justify-between items-center bg-white">
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
