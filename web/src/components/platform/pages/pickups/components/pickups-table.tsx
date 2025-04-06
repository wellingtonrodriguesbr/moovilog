"use client";

import { useFetchPickupsFromCompany } from "@/hooks/pickup/use-fetch-pickups-from-company";
import { SkeletonPickupsTable } from "@/components/platform/pages/pickups/components/skeleton-pickups-table";
import { PickupsTableRow } from "@/components/platform/pages/pickups/components/pickups-table-row";
import { PickupsTableHeader } from "@/components/platform/pages/pickups/components/pickups-table-header";
import { Table, TableBody } from "@/components/ui/table";
import { Empty } from "@/components/platform/empty";

export function PickupsTable() {
	const { pickupsFromCompany, isFetchPickupsFromCompanyPending } =
		useFetchPickupsFromCompany();

	if (isFetchPickupsFromCompanyPending) {
		return <SkeletonPickupsTable />;
	}

	if (pickupsFromCompany.length > 0) {
		return (
			<Table>
				<PickupsTableHeader />
				<TableBody>
					{pickupsFromCompany.map((pickup) => (
						<PickupsTableRow key={pickup.id} pickup={pickup} />
					))}
				</TableBody>
			</Table>
		);
	}

	return <Empty context="pickup" />;
}
