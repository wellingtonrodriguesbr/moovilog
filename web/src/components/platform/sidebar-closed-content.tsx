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
import { Button } from "../ui/button";

export function SidebarClosedContent() {
  return (
    <ul className="mt-6 w-full flex flex-col gap-4 px-4">
      {items.map((item) => (
        <li key={item.name} className="">
          <Button
            variant="secondary"
            className=" hover:bg-app-blue-500 hover:text-white cursor-pointer"
          >
            {item.icon}
          </Button>
        </li>
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
