import Image from "next/image";

import { AccountMenu } from "./account-menu";
import { ButtonOpenCloseSidebar } from "./button-open-close-sidebar";
import { Button } from "../ui/button";
import { MessageSquareMore } from "lucide-react";

export function HeaderPlatform() {
	return (
		<header className="col-span-full h-16 px-4 border-b flex justify-between items-center bg-white">
			<div className="flex items-center gap-4">
				<ButtonOpenCloseSidebar />
				<Image
					src="/logo-blue.svg"
					alt="moovilog"
					className="hidden md:block w-[170px]"
					width={250}
					height={193}
				/>
			</div>
			<Image
				src="/logo-blue.svg"
				alt="moovilog"
				className="block md:hidden w-[160px]"
				width={250}
				height={193}
			/>

			<div className="flex items-center gap-4">
				<Button variant="outline">
					<MessageSquareMore className="size-4" />
					Enviar feedback
				</Button>
				<AccountMenu />
			</div>
		</header>
	);
}
