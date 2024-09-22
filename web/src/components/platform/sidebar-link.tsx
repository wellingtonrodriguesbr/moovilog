import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
	isOpen: boolean;
	path: string;
	url: string;
	text: string;
	iconLeft?: ReactNode;
	className?: string;
}

export function SidebarbarLink({
	isOpen,
	path,
	url,
	text,
	iconLeft,
	className,
}: SidebarLinkProps) {
	return (
		<Link
			data-state={isOpen ? "open" : "closed"}
			data-disabled={false}
			data-active={path === url || path.includes(url)}
			href={url}
			className={cn(
				"text-sm font-medium w-full data-[state=closed]:w-fit flex items-center gap-2 border-b py-6 data-[active=true]:text-app-blue-500 hover:text-app-blue-500 transition-all group pl-1 data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none",
				className
			)}
		>
			{iconLeft}
			<span
				data-state={isOpen ? "open" : "closed"}
				className="text-nowrap data-[state=closed]:w-0 data-[state=closed]:opacity-0 data-[state=open]:w-fit text-inherit transition-opacity duration-300"
			>
				{text}
			</span>
			<ChevronRight className="size-4 ml-auto group-data-[active=true]:text-app-blue-500 group-data-[state=closed]:hidden group-data-[state=closed]:opacity-0 transition-opacity duration-300" />
		</Link>
	);
}
