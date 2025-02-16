import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Ellipsis } from "lucide-react";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { ListCitiesFromRouteDropdown } from "@/components/platform/pages/routes/components/list-cities-from-route-dropdown";
import { ExtendedRoute } from "@/hooks/route/use-fetch-routes-from-company";

interface DriversTableRowProps {
	route: ExtendedRoute;
}

export function RoutesTableRow({ route }: DriversTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">{route.id}</TableCell>
			<TableCell className="text-nowrap">{route.name}</TableCell>
			<TableCell className="text-nowrap">
				<ListCitiesFromRouteDropdown routeId={route.id} />
			</TableCell>
			<TableCell className="text-nowrap">
				{route.creator.user.name}
			</TableCell>
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
