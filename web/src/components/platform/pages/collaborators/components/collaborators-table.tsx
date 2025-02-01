"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchMembersFromCompany } from "@/hooks/company-member/use-fetch-company-members";

import { CollaboratorsTableHeader } from "@/components/platform/pages/collaborators/components/collaborators-table-header";
import { CollaboratorsTableRow } from "@/components/platform/pages/collaborators/components/collaborators-table-row";
import { SkeletonCollaboratorsTable } from "@/components/platform/pages/collaborators/components/skeleton-collaborators-table";

export function CollaboratorsTable() {
	const { companyMembers, isFetchMembersFromCompanyPending } =
		useFetchMembersFromCompany();

	return (
		<>
			{isFetchMembersFromCompanyPending ? (
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
