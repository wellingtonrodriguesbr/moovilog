import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

interface SidebarLinkProps {
  isOpen: boolean;
  url: string;
  text: string;
  iconLeft?: ReactNode;
  className?: string;
}

export function SidebarbarLink({ isOpen, url, text, iconLeft, className }: SidebarLinkProps) {
  const { isOpen: sidebarIsOpen } = useOpenCloseSidebar();
  const path = usePathname();

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          data-state={isOpen ? "open" : "closed"}
          data-disabled={path?.includes("/cadastro/empresa")}
          data-active={path === url || path?.includes(url)}
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
      </TooltipTrigger>
      <TooltipContent
        data-invisible={sidebarIsOpen}
        className="hidden xl:block xl:data-[invisible=true]:hidden"
        side="left"
      >
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
