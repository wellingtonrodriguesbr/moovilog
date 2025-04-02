import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Box } from "lucide-react";

interface TotalPickupsCardProps {
	totalPickups: number;
}

export function TotalPickupsCard({ totalPickups }: TotalPickupsCardProps) {
	return (
		<Card className="min-h-[140px] h-full bg-app-blue-200 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-3xl text-app-blue-700">
					{totalPickups}
				</CardTitle>
				<CardDescription className="text-app-blue-700">
					Coletas
				</CardDescription>
				<Box className="size-6 absolute top-4 right-4 text-app-blue-700" />
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
