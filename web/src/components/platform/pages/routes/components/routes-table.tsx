"use client";

import { Table, TableBody } from "@/components/ui/table";
import { SkeletonDriversTable } from "@/components/platform/pages/drivers/components/skeleton-drivers-table";
import { RoutesTableHeader } from "@/components/platform/pages/routes/components/routes-table-header";
import { RoutesTableRow } from "@/components/platform/pages/routes/components/routes-table-row";
import { useFetchRoutesFromCompany } from "@/hooks/route/use-fetch-routes-from-company";
import { Empty } from "@/components/platform/empty";

export function RoutesTable() {
  const { routes, isFetchRoutesFromCompanyPending } = useFetchRoutesFromCompany();

  if (isFetchRoutesFromCompanyPending) {
    return <SkeletonDriversTable />;
  }

  if (routes?.length > 0) {
    return (
      <Table>
        <RoutesTableHeader />
        <TableBody>
          {routes.map((item) => (
            <RoutesTableRow key={item.id} route={item} />
          ))}
        </TableBody>
      </Table>
    );
  }

  return <Empty context="route" />;
}
