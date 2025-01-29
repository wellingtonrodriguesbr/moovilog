import Image from "next/image";
import { usePathname } from "next/navigation";

import { SidebarItem } from "@/components/platform/sidebar/sidebar-item";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCNPJ } from "@/utils/format-cnpj";
import {
	BarChart,
	Group,
	Handshake,
	Home,
	Landmark,
	LayoutGrid,
	Route,
	Truck,
	Users,
} from "lucide-react";

export function SidebarContent() {
	const path = usePathname();

	const { isOpen } = useOpenCloseSidebar();
	const { company, isGetCompanyInformationPending } =
		useGetCompanyInformation();

	return (
		<div className="px-4">
			<div className="flex items-center gap-4">
				<Image
					src="/moovilog-icon-blue.svg"
					alt="moovilog"
					width={250}
					height={193}
					data-state={isOpen ? "open" : "closed"}
					className="w-[50px] md:data-[state=closed]:w-[32px] transition-all ease-in-out duration-300"
				/>

				<div
					data-state={isOpen ? "open" : "closed"}
					className="flex flex-col group"
				>
					{isGetCompanyInformationPending ? (
						<>
							<Skeleton className="h-5 md:h-4 w-24 md:w-[150px] rounded-lg" />
							<Skeleton className="h-5 md:h-4 w-16 md:w-[130px] rounded-lg mt-1" />
						</>
					) : (
						<>
							<p className="text-base font-medium md:group-data-[state=closed]:w-0 md:group-data-[state=closed]:opacity-0 text-nowrap transition-all ease-in-out duration-300 md:text-ellipsis md:max-w-[9rem] md:overflow-hidden">
								{company?.name}
							</p>
							<p className="text-zinc-700 text-xs md:group-data-[state=closed]:w-0 md:group-data-[state=closed]:opacity-0 text-nowrap transition-all ease-in-out duration-300">
								{formatCNPJ(company?.documentNumber ?? "")}
							</p>
						</>
					)}
				</div>
			</div>

			<ul className="flex flex-col mt-6">
				{ITEMS.map((item) => (
					<SidebarItem
						key={item.name}
						item={item}
						isOpen={isOpen}
						path={path}
					/>
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
	{
		name: "Operacional",
		url: "/operacional",
		icon: <Group className="size-4" />,
	},
	{
		name: "Fretes",
		url: "/fretes",
		icon: <LayoutGrid className="size-4" />,
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
