import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatWeight } from "@/utils/format-weight";
import { Weight } from "lucide-react";

interface TotalWeightDeliveriesCardProps {
  totalWeightDeliveries: number;
}

export function TotalWeightDeliveriesCard({ totalWeightDeliveries }: TotalWeightDeliveriesCardProps) {
  return (
    <Card className="min-h-[140px] h-full bg-app-blue-100 relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-app-blue-600">
          {formatWeight(totalWeightDeliveries) ?? 0}
          kg
        </CardTitle>
        <CardDescription className="text-app-blue-600">Peso total de entregas</CardDescription>
        <Weight className="size-6 absolute top-4 right-4 text-app-blue-600" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
