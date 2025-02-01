import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Ellipsis } from "lucide-react";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { ListCitiesFromRouteDropdown } from "@/components/platform/pages/routes/components/list-cities-from-route-dropdown";
import { Route } from "@/interfaces";

interface DriversTableRowProps {
	route: Route;
}

export function RoutesTableRow({ route }: DriversTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">{route.id}</TableCell>
			<TableCell className="text-nowrap">{route.name}</TableCell>
			<TableCell className="text-nowrap">
				<ListCitiesFromRouteDropdown routeId={route.id} />
			</TableCell>
			<TableCell className="text-nowrap">{route.creatorId}</TableCell>
			<TableCell className="text-nowrap">
				{formatBrazilianDate(route.createdAt)}
			</TableCell>
			<TableCell className="text-right">
				<Button variant="ghost">
					<Ellipsis className="size-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
