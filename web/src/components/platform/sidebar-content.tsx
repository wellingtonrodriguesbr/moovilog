import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart,
  Building,
  Container,
  Handshake,
  Headset,
  Home,
  Landmark,
  LayoutGrid,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";
import { SidebarbarLink } from "./sidebar-link";

export function SidebarContent() {
  const path = usePathname();
  const { isOpen, handleOpenAndCloseSidebar } = useOpenCloseSidebar();

  return (
    <ul className="flex flex-col px-4">
      {items.map((item) => (
        <SidebarItem key={item.name} item={item} isOpen={isOpen} path={path} />
      ))}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={!isOpen ? handleOpenAndCloseSidebar : () => {}}
            data-sidebar={isOpen ? "open" : "closed"}
            className="pl-1 [&[data-sidebar=closed]>svg]:hidden py-6 hover:text-app-blue-500"
          >
            <div className="flex items-center gap-2">
              <Building className="size-4" />
              <span
                data-state={isOpen ? "open" : "closed"}
                className="text-sm text-nowrap data-[state=closed]:w-0 data-[state=closed]:opacity-0 data-[state=open]:w-fit text-inherit transition-opacity duration-300"
              >
                Minha empresa
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col">
            <SidebarbarLink
              isOpen={isOpen}
              path={path}
              url="/minha-empresa/dados-cadastrais"
              text="Dados cadastrais"
              iconLeft={<Settings className="size-4" />}
            />
            <SidebarbarLink
              isOpen={isOpen}
              path={path}
              url="/minha-empresa/colaboradores"
              text="Colaboradores"
              iconLeft={<Users className="size-4" />}
              className="border-b-0"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
    name: "Fretes",
    url: "/fretes",
    icon: <LayoutGrid className="size-4" />,
  },
  {
    name: "Suprimentos",
    url: "/suprimentos",
    icon: <Container className="size-4" />,
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
];
