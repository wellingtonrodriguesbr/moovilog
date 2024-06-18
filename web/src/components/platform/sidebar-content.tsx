import {
  BarChart,
  Building2,
  Handshake,
  Headset,
  Home,
  Landmark,
  Truck,
  UserRoundCog,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export function SidebarContent() {
  return (
    <ul className="flex flex-col px-4">
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
    name: "Veículos",
    url: "/veiculos",
    icon: <Truck className="size-4" />,
  },
  {
    name: "Minha empresa",
    url: "/minha-empresa",
    icon: <Building2 className="size-4" />,
  },
];
