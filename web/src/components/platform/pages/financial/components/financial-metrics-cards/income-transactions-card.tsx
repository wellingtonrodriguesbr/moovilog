import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { ArrowUp, ArrowUpRight } from "lucide-react";

interface IncomeTransactionsCardProps {
  incomeTransactions: number;
}

export function IncomeTransactionsCard({ incomeTransactions }: IncomeTransactionsCardProps) {
  return (
    <Card className="h-48 bg-emerald-100 relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl text-emerald-600">
          {formatCurrencyBR(incomeTransactions)}
        </CardTitle>
        <CardDescription className="text-emerald-600">Total de entradas</CardDescription>
        <ArrowUpRight className="size-8 absolute top-4 right-4 text-emerald-600" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
