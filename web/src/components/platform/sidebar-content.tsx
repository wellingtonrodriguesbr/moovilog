import Image from "next/image";
import { usePathname } from "next/navigation";

import {
	Handshake,
	Home,
	Landmark,
	LayoutGrid,
	Route,
	Truck,
	Users,
} from "lucide-react";
import { SidebarItem } from "@/components/platform/sidebar-item";
import { useOpenCloseSidebar } from "@/providers/sidebar-provider";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";
import { Skeleton } from "../ui/skeleton";
import { formatCNPJ } from "@/utils/format-cnpj";

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
					className="w-[50px]"
				/>

				<div
					data-state={isOpen ? "open" : "closed"}
					className="flex flex-col group"
				>
					{isGetCompanyInformationPending ? (
						<Skeleton className="h-5 md:h-4 w-24 md:w-[250px] rounded-lg" />
					) : (
						<p className="text-base font-medium md:group-data-[state=closed]:sr-only text-nowrap">
							{company?.name}
						</p>
					)}
					{isGetCompanyInformationPending ? (
						<Skeleton className="h-5 md:h-4 w-16 md:w-[150px] rounded-lg" />
					) : (
						<p className="text-zinc-700 text-xs md:group-data-[state=closed]:sr-only text-nowrap">
							{formatCNPJ(company?.documentNumber ?? "")}
						</p>
					)}
				</div>
			</div>

			<ul className="flex flex-col mt-8">
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
	// {
	// 	name: "Comercial",
	// 	url: "/comercial",
	// 	icon: <BarChart className="size-4" />,
	// },
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
		url: "/minha-empresa/colaboradores",
		icon: <Users className="size-4" />,
	},
];
