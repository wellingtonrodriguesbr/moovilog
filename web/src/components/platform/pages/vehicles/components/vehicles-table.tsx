"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchVehiclesFromCompany } from "@/hooks/vehicle/use-fetch-vehicles-from-company";
import { VehiclesTableHeader } from "@/components/platform/pages/vehicles/components/vehicles-table-header";
import { VehiclesTableRow } from "@/components/platform/pages/vehicles/components/vehicles-table-row";
import { SkeletonVehiclesTable } from "@/components/platform/pages/vehicles/components/skeleton-vehicles-table";
import { Empty } from "@/components/platform/empty";

export function VehiclesTable() {
	const { vehiclesFromCompany, isFetchVehiclesFromCompanyPending } =
		useFetchVehiclesFromCompany();

	if (isFetchVehiclesFromCompanyPending) {
		return <SkeletonVehiclesTable />;
	}

	if (vehiclesFromCompany.length > 0) {
		return (
			<Table>
				<VehiclesTableHeader />
				<TableBody>
					{vehiclesFromCompany.map((vehicle) => (
						<VehiclesTableRow key={vehicle.id} vehicle={vehicle} />
					))}
				</TableBody>
			</Table>
		);
	}

	return <Empty context="vehicle" />;
}
