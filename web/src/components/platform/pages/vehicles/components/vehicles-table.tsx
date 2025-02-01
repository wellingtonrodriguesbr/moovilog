"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchVehiclesByCompany } from "@/hooks/use-fetch-vehicles-by-company";
import { VehiclesTableHeader } from "@/components/platform/pages/vehicles/components/vehicles-table-header";
import { VehiclesTableRow } from "@/components/platform/pages/vehicles/components/vehicles-table-row";
import { SkeletonVehiclesTable } from "@/components/platform/pages/vehicles/components/skeleton-vehicles-table";

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
