"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchDriversByCompany } from "@/hooks/use-fetch-drivers-by-company";
import { SkeletonDriversTable } from "@/pages/platform/drivers/components/skeleton-drivers-table";
import { DriversTableRow } from "@/pages/platform/drivers/components/drivers-table-row";
import { DriversTableHeader } from "@/pages/platform/drivers/components/drivers-table-header";

export function DriversTable() {
	const { driversByCompany, isFetchDriversByCompanyPending } =
		useFetchDriversByCompany();
	return (
		<>
			{isFetchDriversByCompanyPending ? (
				<SkeletonDriversTable />
			) : (
				<Table>
					<DriversTableHeader />
					<TableBody>
						{driversByCompany?.map((item) => (
							<DriversTableRow key={item.id} driver={item} />
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
}
