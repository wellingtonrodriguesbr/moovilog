import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatWeight } from "@/utils/format-weight";
import { Weight } from "lucide-react";

interface TotalWeightPickupsCardProps {
	totalWeightPickups: number;
}

export function TotalWeightPickupsCard({
	totalWeightPickups,
}: TotalWeightPickupsCardProps) {
	return (
		<Card className="min-h-[140px] h-full bg-app-blue-300 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-2xl text-app-blue-700">
					{formatWeight(totalWeightPickups) ?? 0}
					kg
				</CardTitle>
				<CardDescription className="text-app-blue-700">
					Peso total de coletas
				</CardDescription>
				<Weight className="size-6 absolute top-4 right-4 text-app-blue-700" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
