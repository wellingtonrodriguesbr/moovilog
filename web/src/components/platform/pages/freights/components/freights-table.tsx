"use client";

import { useFetchFreightsFromCompany } from "@/hooks/freight/use-fetch-freights-from-company";
import { SkeletonFreightsTable } from "@/components/platform/pages/freights/components/skeleton-freights-table";
import { FreightsTableRow } from "@/components/platform/pages/freights/components/freights-table-row";
import { FreightsTableHeader } from "@/components/platform/pages/freights/components/freights-table-header";
import { Table, TableBody } from "@/components/ui/table";
import { Empty } from "@/components/platform/empty";

export function FreightsTable() {
  const { freightsFromCompany, isFetchFreightsFromCompanyPending } = useFetchFreightsFromCompany();

  if (isFetchFreightsFromCompanyPending) {
    return <SkeletonFreightsTable />;
  }

  if (freightsFromCompany.length > 0) {
    return (
      <Table>
        <FreightsTableHeader />
        <TableBody>
          {freightsFromCompany.map((freight) => (
            <FreightsTableRow key={freight.id} freight={freight} />
          ))}
        </TableBody>
      </Table>
    );
  }

  return <Empty context="freight" />;
}
