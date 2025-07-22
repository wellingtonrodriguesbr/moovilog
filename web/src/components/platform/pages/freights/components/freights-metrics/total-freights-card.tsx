import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

interface TotalFreightsCardProps {
  totalFreights: number;
}

export function TotalFreightsCard({ totalFreights }: TotalFreightsCardProps) {
  return (
    <Card className="min-h-[140px] h-full bg-zinc-100 relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-4xl">{totalFreights}</CardTitle>
        <CardDescription>Fretes cadastrados</CardDescription>
        <LayoutGrid className="size-6 absolute top-4 right-4" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
