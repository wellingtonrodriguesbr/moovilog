import { TransactionsTable } from "@/components/platform/pages/financial/components/transactions-table";
import { RegisterTransactionDialog } from "@/components/platform/pages/financial/components/register-transaction-dialog";
import { FinancialMetricsCards } from "@/components/platform/pages/financial/components/financial-metrics-cards";

export function Financial() {
  return (
    <section className="flex flex-col gap-12">
      <header className="flex gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-medium">Financeiro</h1>
        <RegisterTransactionDialog />
      </header>
      <div className="flex flex-col gap-12">
        <FinancialMetricsCards />
        <TransactionsTable />
      </div>
    </section>
  );
}
