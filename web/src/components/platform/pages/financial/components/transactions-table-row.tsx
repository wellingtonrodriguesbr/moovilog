import { TransactionDropdownOptions } from "@/components/platform/pages/financial/components/transaction-dropdown-options";
import { TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/platform/copy-button";
import { Badge } from "@/components/ui/badge";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { FinanceTransaction } from "@/interfaces/finance-transaction";
import { formatCurrencyBR } from "@/utils/format-currency-br";

const TRANSACTION_TYPE: Record<string, string> = {
  INCOME: "Entrada",
  EXPENSE: "Despesa",
};

const TRANSACTION_STATUS: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Paga",
  OVERDUE: "Atrasada",
};

interface TransactionsTableRowProps {
  transaction: FinanceTransaction;
}

export function TransactionsTableRow({ transaction }: TransactionsTableRowProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="text-nowrap">
        <CopyButton title="Copiar" data={transaction.id}>
          {transaction.id}
        </CopyButton>
      </TableCell>
      <TableCell className="text-nowrap">{formatCurrencyBR(transaction.amountInCents)}</TableCell>
      <TableCell className="text-nowrap">
        <Badge
          data-pending={transaction.status === "PENDING"}
          data-paid={transaction.status === "PAID"}
          data-overdue={transaction.status === "OVERDUE"}
          className="data-[paid=true]:text-emerald-500 data-[overdue=true]:text-rose-500 data-[pending=true]:text-amber-500 data-[paid=true]:bg-emerald-500/15 data-[overdue=true]:bg-rose-500/15 data-[pending=true]:bg-amber-500/15"
        >
          {TRANSACTION_STATUS[transaction.status]}
        </Badge>
      </TableCell>
      <TableCell className="text-nowrap">
        <Badge
          data-income={transaction.type === "INCOME"}
          data-expense={transaction.type === "EXPENSE"}
          className="data-[income=true]:text-emerald-500 data-[expense=true]:text-rose-500 data-[income=true]:bg-emerald-500/15 data-[expense=true]:bg-rose-500/15"
        >
          {TRANSACTION_TYPE[transaction.type]}
        </Badge>
      </TableCell>
      <TableCell className="text-nowrap">{transaction.category.name}</TableCell>
      <TableCell className="text-nowrap max-w-xs text-ellipsis overflow-hidden">
        {transaction.dueDate ? formatBrazilianDate(transaction.dueDate) : "-"}
      </TableCell>
      <TableCell className="text-nowrap">{formatBrazilianDate(transaction.createdAt)}</TableCell>
      <TableCell className="text-nowrap">{formatBrazilianDate(transaction.updatedAt)}</TableCell>
      <TableCell className="text-right">
        <TransactionDropdownOptions transactionId={transaction.id} />
      </TableCell>
    </TableRow>
  );
}
