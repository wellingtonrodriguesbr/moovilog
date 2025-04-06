import { TableCell, TableRow } from "@/components/ui/table";

import { formatBrazilianDate } from "@/utils/format-brazilian-date";

import { PickupDropdownOptions } from "@/components/platform/pages/pickups/components/pickup-dropdown-options";
import { Pickup } from "@/interfaces/pickup";
import { CopyButton } from "@/components/platform/copy-button";
import { Badge } from "@/components/ui/badge";

const PICKUP_STATUS: Record<string, string> = {
	PENDING: "Pendente",
	IN_ROUTE: "Em rota",
	COLLECTED: "Coletada",
	CANCELED: "Cancelada",
};

const PICKUP_PRIORITY: Record<string, string> = {
	NORMAL: "Normal",
	URGENT: "Urgente",
};

interface PickupsTableRowProps {
	pickup: Pickup;
}

export function PickupsTableRow({ pickup }: PickupsTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">
				<CopyButton
					title="Copiar número da coleta"
					data={pickup.pickupNumber}
				>
					{pickup.pickupNumber}
				</CopyButton>
			</TableCell>
			<TableCell className="text-nowrap">{pickup.senderName}</TableCell>
			<TableCell className="text-nowrap">
				{pickup.recipientName}
			</TableCell>
			<TableCell className="text-nowrap">
				<Badge
					data-pending={pickup.status === "PENDING"}
					data-inRoute={pickup.status === "IN_ROUTE"}
					data-collected={pickup.status === "COLLECTED"}
					data-canceled={pickup.status === "CANCELED"}
					className="data-[collected=true]:text-emerald-500 data-[inRoute=true]:text-violet-500 data-[canceled=true]:text-rose-500 data-[pending=true]:text-amber-500 data-[collected=true]:bg-emerald-500/15 data-[canceled=true]:bg-rose-500/15 data-[pending=true]:bg-amber-500/15 data-[inRoute=true]:bg-violet-500/15"
				>
					{PICKUP_STATUS[pickup.status]}
				</Badge>
			</TableCell>
			<TableCell className="text-nowrap">
				<Badge
					data-normal={pickup.priority === "NORMAL"}
					data-urgent={pickup.priority === "URGENT"}
					className="data-[normal=true]:text-emerald-500 data-[urgent=true]:text-rose-500 data-[normal=true]:bg-emerald-500/15 data-[urgent=true]:bg-rose-500/15"
				>
					{PICKUP_PRIORITY[pickup.priority]}
				</Badge>
			</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(pickup.requestedAt.toString())}
			</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(pickup.scheduledDate.toString())}
			</TableCell>
			<TableCell className="text-nowrap">
				{pickup.collectedAt
					? formatBrazilianDate(pickup.collectedAt.toString())
					: "Não coletado"}
			</TableCell>
			<TableCell className="text-right">
				<PickupDropdownOptions pickupId={pickup.id} />
			</TableCell>
		</TableRow>
	);
}
