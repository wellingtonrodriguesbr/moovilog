import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchCitiesFromRoute } from "@/hooks/route/use-fetch-cities-from-route";
import { Eye } from "lucide-react";

interface ListCitiesFromRouteDropdownProps {
	routeId: string;
}

export function ListCitiesFromRouteDropdown({
	routeId,
}: ListCitiesFromRouteDropdownProps) {
	const { cities } = useFetchCitiesFromRoute({
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
