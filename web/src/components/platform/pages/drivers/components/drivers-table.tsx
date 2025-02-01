"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchDriversFromCompany } from "@/hooks/driver/use-fetch-drivers-from-company";
import { SkeletonDriversTable } from "@/components/platform/pages/drivers/components/skeleton-drivers-table";
import { DriversTableRow } from "@/components/platform/pages/drivers/components/drivers-table-row";
import { DriversTableHeader } from "@/components/platform/pages/drivers/components/drivers-table-header";
import { Empty } from "@/components/platform/empty";

export function DriversTable() {
	const { driversFromCompany, isFetchDriversFromCompanyPending } =
		useFetchDriversFromCompany();

	if (isFetchDriversFromCompanyPending) {
		return <SkeletonDriversTable />;
	}

	if (driversFromCompany.length > 0) {
		return (
			<Table>
				<DriversTableHeader />
				<TableBody>
					{driversFromCompany.map((driver) => (
						<DriversTableRow key={driver.id} driver={driver} />
					))}
				</TableBody>
			</Table>
		);
	}

	return <Empty context="driver" />;
}
