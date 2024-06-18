import Link from "next/link";
import { ReactNode } from "react";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  item: {
    name: string;
    url: string;
    icon: ReactNode;
  };
}

export function SidebarItem({ item }: SidebarItemProps) {
  const path = usePathname();

  return (
    <li className="w-full">
      <Link
        data-active={path.includes(item.url)}
        href={item.url}
        className="text-sm font-medium w-full flex items-center gap-2 border-b py-6 data-[active=true]:text-app-blue-500 hover:text-app-blue-500 transition-colors text-nowrap group"
      >
        {item.icon}
        {item.name}
        <ChevronRight className="size-4 text-zinc-500 ml-auto group-data-[active=true]:text-app-blue-500" />
      </Link>
    </li>
  );
}
