"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchCompanyMembers } from "@/hooks/use-fetch-company-members";

import { CollaboratorsTableHeader } from "@/components/platform/collaborators/collaborators-table-header";
import { CollaboratorsTableRow } from "@/components/platform/collaborators/collaborators-table-row";
import { SkeletonCollaboratorsTable } from "@/components/platform/collaborators/skeleton-collaborators-table";

export function CollaboratorsTable() {
	const { companyMembers, isFetchCompanyMembersPending } =
		useFetchCompanyMembers();

	return (
		<>
			{isFetchCompanyMembersPending ? (
				<SkeletonCollaboratorsTable />
			) : (
				<Table>
					<CollaboratorsTableHeader />
					<TableBody>
						{companyMembers?.map((companyMember) => (
							<CollaboratorsTableRow
								key={companyMember.id}
								companyMember={companyMember}
							/>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
}
