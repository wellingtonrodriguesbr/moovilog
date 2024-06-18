import {
  BarChart,
  Building2,
  Handshake,
  Headset,
  Home,
  Landmark,
  UserRoundCog,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export function SidebarContent() {
  return (
    <ul className="mt-6 w-full flex flex-col">
      {items.map((item) => (
        <SidebarItem key={item.name} item={item} />
      ))}
    </ul>
  );
}

const items = [
  {
    name: "Home",
    url: "/inicio",
    icon: <Home className="size-4" />,
  },
  {
    name: "Comercial",
    url: "/comercial",
    icon: <BarChart className="size-4" />,
  },
  {
    name: "Financeiro",
    url: "/financeiro",
    icon: <Landmark className="size-4" />,
  },
  {
    name: "Operacional",
    url: "/operacional",
    icon: <UserRoundCog className="size-4" />,
  },
  {
    name: "Chamados",
    url: "/chamados",
    icon: <Headset className="size-4" />,
  },
  {
    name: "Motoristas",
    url: "/motoristas",
    icon: <Handshake className="size-4" />,
  },
  {
    name: "Minha empresa",
    url: "/minha-empresa",
    icon: <Building2 className="size-4" />,
  },
];
