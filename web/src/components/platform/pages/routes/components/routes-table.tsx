"use client";

import { Table, TableBody } from "@/components/ui/table";
import { SkeletonDriversTable } from "@/components/platform/pages/drivers/components/skeleton-drivers-table";
import { RoutesTableHeader } from "@/components/platform/pages/routes/components/routes-table-header";
import { RoutesTableRow } from "@/components/platform/pages/routes/components/routes-table-row";
import { useFetchRoutesFromCompany } from "@/hooks/route/use-fetch-routes-from-company";

export function RoutesTable() {
	const { routes, isFetchRoutesFromCompanyPending } =
		useFetchRoutesFromCompany();

	return (
		<>
			{isFetchRoutesFromCompanyPending ? (
				<SkeletonDriversTable />
			) : (
				<Table>
					<RoutesTableHeader />
					<TableBody>
						{routes?.map((item) => (
							<RoutesTableRow key={item.id} route={item} />
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
}
