import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Truck } from "lucide-react";

interface TotalDeliveriesCardProps {
	totalDeliveries: number;
}

export function TotalDeliveriesCard({
	totalDeliveries,
}: TotalDeliveriesCardProps) {
	return (
		<Card className="min-h-[140px] h-full bg-app-blue-50 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-app-blue-500">
					{totalDeliveries}
				</CardTitle>
				<CardDescription className="text-app-blue-500">
					Entregas
				</CardDescription>
				<Truck className="size-6 absolute top-4 right-4 text-app-blue-500" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
