"use client";

import { Table, TableBody } from "@/components/ui/table";
import { SkeletonDriversTable } from "@/components/platform/pages/drivers/components/skeleton-drivers-table";
import { RoutesTableHeader } from "./routes-table-header";
import { RoutesTableRow } from "./routes-table-row";
import { useFetchCompanyRoutes } from "@/hooks/use-fetch-company-routes";

export function RoutesTable() {
	const { routes, isFetchCompanyRoutesPending } = useFetchCompanyRoutes();

	return (
		<>
			{isFetchCompanyRoutesPending ? (
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
