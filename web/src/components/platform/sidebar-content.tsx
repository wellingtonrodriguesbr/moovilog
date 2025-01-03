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

export function SidebarContent() {
	const path = usePathname();
	const { isOpen } = useOpenCloseSidebar();

	return (
		<ul className="flex flex-col px-4">
			{ITEMS.map((item) => (
				<SidebarItem
					key={item.name}
					item={item}
					isOpen={isOpen}
					path={path}
				/>
			))}
		</ul>
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
