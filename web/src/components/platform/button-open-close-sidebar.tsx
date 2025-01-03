"use client";

import { ChevronsLeftRight } from "lucide-react";
import { Button } from "../ui/button";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

export function ButtonOpenCloseSidebar() {
	const { handleOpenAndCloseSidebar } = useOpenCloseSidebar();

	return (
		<Button
			variant="ghost"
			onClick={handleOpenAndCloseSidebar}
			className="w-fit h-fit p-2"
		>
			<ChevronsLeftRight className="size-4" />
		</Button>
	);
}
