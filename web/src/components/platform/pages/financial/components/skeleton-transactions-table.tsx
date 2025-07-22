import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTransactionsTable() {
  return (
    <Table>
      <TableHeader className="bg-zinc-100 hover:bg-zinc-100">
        <TableRow className="hover:bg-zinc-100">
          <TableHead className="rounded-tl-lg">
            <Skeleton className="w-16 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-16 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-20 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-16 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-20 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-36 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-20 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-20 h-4 bg-zinc-300" />
          </TableHead>
          <TableHead className="rounded-tr-lg"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 })?.map((_, index) => (
          <TableRow className="hover:bg-transparent" key={index}>
            <TableCell>
              <Skeleton className="w-48 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-16 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-12 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-24 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-24 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-24 h-4 bg-zinc-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-8 h-8 bg-zinc-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
