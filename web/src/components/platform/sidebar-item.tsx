import Link from "next/link";
import { ReactNode } from "react";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";

interface SidebarItemProps {
  isOpen: boolean;
  item: {
    name: string;
    url: string;
    icon: ReactNode;
  };
}

export function SidebarItem({ item, isOpen }: SidebarItemProps) {
  const path = usePathname();

  return (
    <li className="w-full">
      <Link
        data-active={path.includes(item.url)}
        data-state={isOpen ? "open" : "closed"}
        href={item.url}
        className="text-sm font-medium w-full data-[state=closed]:w-fit flex items-center gap-2 border-b py-6 data-[active=true]:text-app-blue-500 hover:text-app-blue-500 transition-all group pl-1"
      >
        {item.icon}
        <span
          data-state={isOpen ? "open" : "closed"}
          className="text-nowrap data-[state=closed]:w-0 data-[state=closed]:opacity-0 data-[state=open]:w-fit text-inherit transition-opacity duration-300"
        >
          {item.name}
        </span>
        <ChevronRight className="size-4 ml-auto group-data-[active=true]:text-app-blue-500 group-data-[state=closed]:hidden group-data-[state=closed]:opacity-0 transition-opacity duration-300" />
      </Link>
    </li>
  );
}
