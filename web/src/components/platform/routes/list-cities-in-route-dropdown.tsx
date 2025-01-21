import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchCitiesInRoute } from "@/hooks/use-fetch-cities-in-route";
import { Eye } from "lucide-react";

interface ListCitiesInRouteDropdownProps {
	routeId: string;
}

export function ListCitiesInRouteDropdown({
	routeId,
}: ListCitiesInRouteDropdownProps) {
	const { cities, isFetchCitiesInRoutePending } = useFetchCitiesInRoute({
		routeId,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<Eye className="size-4" />
					Ver cidades
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Cidades na rota</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{cities?.map((city) => (
					<DropdownMenuItem key={city.id}>
						{city.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
