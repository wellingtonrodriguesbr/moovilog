"use client";

import { usePathname } from "next/navigation";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ROUTES_MAP: Record<string, string> = {
	"/inicio": "Início",
	"/financeiro": "Financeiro",
	"/fretes": "Fretes",
	"/rotas": "Rotas",
	"/motoristas": "Motoristas",
	"/veiculos": "Veículos",
	"/meus-dados": "Meu perfil",
	"/minha-empresa/colaboradores": "Colaboradores",
	"/minha-empresa/dados-cadastrais": "Dados da empresa",
};

export function BreadcrumbPlatform() {
	const path = usePathname();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/inicio">Início</BreadcrumbLink>
				</BreadcrumbItem>
				{path !== "/inicio" && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{ROUTES_MAP[path]}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
