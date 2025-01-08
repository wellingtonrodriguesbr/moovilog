import { TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";

import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

import { Ellipsis } from "lucide-react";
import { Driver } from "@/hooks/use-fetch-drivers-by-company";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { Badge } from "@/components/ui/badge";

const DRIVER_TYPE: Record<string, string> = {
	AGGREGATE: "Agregado",
	FREELANCER: "Freelancer",
	INTERNAL: "Interno",
};

const DRIVER_STATUS: Record<string, string> = {
	ACTIVE: "Ativo",
	INACTIVE: "Inativo",
	PENDING: "Pendente",
};

interface DriversTableRowProps {
	driver: Driver;
}

export function RoutesTableRow({ driver }: DriversTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">{driver.name}</TableCell>
			<TableCell className="text-nowrap">
				<CopyButton data={driver.documentNumber} title="Copiar CPF">
					{formatCPF(driver.documentNumber)}
				</CopyButton>
			</TableCell>
			<TableCell className="text-nowrap">
				{formatPhone(driver.phone)}
			</TableCell>
			<TableCell className="text-nowrap">
				{DRIVER_TYPE[driver.type]}
			</TableCell>
			<TableCell className="text-nowrap">
				<Badge
					data-active={driver.status === "ACTIVE"}
					data-inactive={driver.status === "INACTIVE"}
					data-pending={driver.status === "PENDING"}
					className="data-[active=true]:text-emerald-500 data-[inactive=true]:text-rose-500 data-[pending=true]:text-amber-500 data-[active=true]:bg-emerald-500/15 data-[inactive=true]:bg-rose-500/15 data-[pending=true]:bg-amber-500/15"
				>
					{DRIVER_STATUS[driver.status]}
				</Badge>
			</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(driver.createdAt)}
			</TableCell>
			<TableCell className="text-right">
				<Button variant="ghost">
					<Ellipsis className="size-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
