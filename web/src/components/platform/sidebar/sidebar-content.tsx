import Image from "next/image";

import { SidebarItem } from "@/components/platform/sidebar/sidebar-item";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";
import { useGetCompanyInformation } from "@/hooks/company/use-get-company-information";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCNPJ } from "@/utils/format-cnpj";
import {
  BarChart,
  Box,
  Group,
  Handshake,
  Home,
  Landmark,
  LayoutGrid,
  Route,
  Siren,
  Truck,
  Users,
  Percent,
} from "lucide-react";

export function SidebarContent() {
  const { isOpen } = useOpenCloseSidebar();
  const { companyInformation, isGetCompanyInformationPending } = useGetCompanyInformation();

  return (
    <div className="px-4">
      <div className="hidden md:flex items-center gap-4">
        <Image
          src="/moovilog-icon-blue.svg"
          alt="moovilog"
          width={250}
          height={193}
          data-state={isOpen ? "open" : "closed"}
          className="w-[50px] md:data-[state=closed]:w-[32px] transition-all ease-in-out duration-300"
        />

        <div data-state={isOpen ? "open" : "closed"} className="flex flex-col group">
          {isGetCompanyInformationPending ? (
            <>
              <Skeleton className="h-6 w-[150px] rounded-lg" />
              <Skeleton className="h-3 w-[130px] rounded-lg mt-1" />
            </>
          ) : (
            <>
              <p className="text-base font-medium md:group-data-[state=closed]:w-0 md:group-data-[state=closed]:opacity-0 text-nowrap transition-all ease-in-out duration-300 md:text-ellipsis md:max-w-[9rem] md:overflow-hidden">
                {companyInformation?.name}
              </p>
              <p className="text-zinc-700 text-xs md:group-data-[state=closed]:w-0 md:group-data-[state=closed]:opacity-0 text-nowrap transition-all ease-in-out duration-300">
                {formatCNPJ(companyInformation?.documentNumber ?? "")}
              </p>
            </>
          )}
        </div>
      </div>

      <ul className="flex flex-col mt-0 md:mt-6">
        {ITEMS.map((item) => (
          <SidebarItem key={item.name} item={item} isOpen={isOpen} />
        ))}
      </ul>
    </div>
  );
}

const ITEMS = [
  {
    name: "Início",
    url: "/inicio",
    icon: <Home className="size-4" />,
  },
  {
    name: "Financeiro",
    url: "/financeiro",
    icon: <Landmark className="size-4" />,
  },
  // {
  // 	name: "Comercial",
  // 	url: "/comercial",
  // 	icon: <Percent className="size-4" />,
  // },
  {
    name: "Fretes",
    url: "/fretes",
    icon: <LayoutGrid className="size-4" />,
  },
  {
    name: "Coletas",
    url: "/coletas",
    icon: <Box className="size-4" />,
  },
  {
    name: "Rotas",
    url: "/rotas",
    icon: <Route className="size-4" />,
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
    name: "Ocorrências",
    url: "/ocorrencias",
    icon: <Siren className="size-4" />,
  },
  {
    name: "Operacional",
    url: "/operacional",
    icon: <Group className="size-4" />,
  },
  {
    name: "Colaboradores",
    url: "/colaboradores",
    icon: <Users className="size-4" />,
  },
  {
    name: "Gestão de desempenho",
    url: "/gestao-de-desempenho",
    icon: <BarChart className="size-4" />,
  },
];
