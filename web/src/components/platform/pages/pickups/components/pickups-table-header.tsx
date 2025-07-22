import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PickupsTableHeader() {
  return (
    <TableHeader className="bg-zinc-100 hover:bg-zinc-100">
      <TableRow className="hover:bg-zinc-100">
        <TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">Número da coleta</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Remetente</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Destinatário</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Status</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Prioridade</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Solicitada em</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Agendada para</TableHead>
        <TableHead className="text-app-blue-900 font-medium text-nowrap">Coletada em</TableHead>
        <TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
