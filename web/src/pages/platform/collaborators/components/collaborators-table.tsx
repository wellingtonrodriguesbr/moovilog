"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchCompanyMembers } from "@/hooks/use-fetch-company-members";

import { CollaboratorsTableHeader } from "@/pages/platform/collaborators/components/collaborators-table-header";
import { CollaboratorsTableRow } from "@/pages/platform/collaborators/components/collaborators-table-row";
import { SkeletonCollaboratorsTable } from "@/pages/platform/collaborators/components/skeleton-collaborators-table";

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
