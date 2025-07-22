import { ReactNode } from "react";
import { SidebarbarLink } from "@/components/platform/sidebar/sidebar-link";

interface SidebarItemProps {
  isOpen: boolean;
  item: {
    name: string;
    url: string;
    icon: ReactNode;
  };
}

export function SidebarItem({ item, isOpen }: SidebarItemProps) {
  return (
    <li className="w-full">
      <SidebarbarLink isOpen={isOpen} url={item.url} text={item.name} iconLeft={item.icon} />
    </li>
  );
}
