import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface VehicleMetricsCardProps {
	description: string;
	icon: LucideIcon;
	total: number;
}

export function VehicleMetricsCard({
	description,
	icon: Icon,
	total,
}: VehicleMetricsCardProps) {
	return (
		<Card className="h-full bg-zinc-100 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-5xl">
					{total}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
				<Icon className="size-6 absolute top-4 right-4" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
