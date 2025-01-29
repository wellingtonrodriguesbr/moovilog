"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchVehiclesByCompany } from "@/hooks/use-fetch-vehicles-by-company";
import { VehiclesTableHeader } from "@/pages/platform/vehicles/components/vehicles-table-header";
import { VehiclesTableRow } from "@/pages/platform/vehicles/components/vehicles-table-row";
import { SkeletonVehiclesTable } from "@/pages/platform/vehicles/components/skeleton-vehicles-table";

export function VehiclesTable() {
	const { vehiclesByCompany, isFetchVehiclesByCompanyPending } =
		useFetchVehiclesByCompany();

	return (
		<>
			{isFetchVehiclesByCompanyPending ? (
				<SkeletonVehiclesTable />
			) : (
				<Table>
					<VehiclesTableHeader />
					<TableBody>
						{vehiclesByCompany?.map((vehicle) => (
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
