"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchDriversFromCompany } from "@/hooks/driver/use-fetch-drivers-from-company";
import { SkeletonDriversTable } from "@/components/platform/pages/drivers/components/skeleton-drivers-table";
import { DriversTableRow } from "@/components/platform/pages/drivers/components/drivers-table-row";
import { DriversTableHeader } from "@/components/platform/pages/drivers/components/drivers-table-header";

export function DriversTable() {
	const { driversFromCompany, isFetchDriversFromCompanyPending } =
		useFetchDriversFromCompany();
	return (
		<>
			{isFetchDriversFromCompanyPending ? (
				<SkeletonDriversTable />
			) : (
				<Table>
					<DriversTableHeader />
					<TableBody>
						{driversFromCompany?.map((item) => (
							<DriversTableRow key={item.id} driver={item} />
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
}
