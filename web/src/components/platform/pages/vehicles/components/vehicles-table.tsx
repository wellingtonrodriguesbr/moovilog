"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchVehiclesFromCompany } from "@/hooks/vehicle/use-fetch-vehicles-from-company";
import { VehiclesTableHeader } from "@/components/platform/pages/vehicles/components/vehicles-table-header";
import { VehiclesTableRow } from "@/components/platform/pages/vehicles/components/vehicles-table-row";
import { SkeletonVehiclesTable } from "@/components/platform/pages/vehicles/components/skeleton-vehicles-table";

export function VehiclesTable() {
	const { vehiclesFromCompany, isFetchVehiclesFromCompanyPending } =
		useFetchVehiclesFromCompany();

	return (
		<>
			{isFetchVehiclesFromCompanyPending ? (
				<SkeletonVehiclesTable />
			) : (
				<Table>
					<VehiclesTableHeader />
					<TableBody>
						{vehiclesFromCompany?.map((vehicle) => (
							<VehiclesTableRow
								key={vehicle.id}
								vehicle={vehicle}
							/>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
}
