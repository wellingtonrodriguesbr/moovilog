import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionsTableHeader() {
  return (
    <TableHeader className="bg-zinc-100 hover:bg-zinc-100">
      <TableRow className="hover:bg-zinc-100">
        <TableHead className="text-app-blue-900 font-medium text-nowrap rounded-tl-lg">Id da transação</TableHead>
        <TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">Valor</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Status</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Tipo</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Categoria</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Data de vencimento</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Cadastrado em</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Última atualização</TableHead>
        <TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
