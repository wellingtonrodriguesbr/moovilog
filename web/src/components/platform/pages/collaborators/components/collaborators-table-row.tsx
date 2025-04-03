import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/platform/copy-button";
import { CollaboratorPermissionsDropdown } from "@/components/platform/pages/collaborators/components/collaborator-permissions-dropdown";
import { CompanyMember } from "@/interfaces";

import { formatBrazilianDate } from "@/utils/format-brazilian-date";

import { Ellipsis } from "lucide-react";

interface CollaboratorsTableRowProps {
	companyMember: CompanyMember;
}

const COMPANY_MEMBER_STATUS: Record<string, string> = {
	ACTIVE: "Ativo",
	INACTIVE: "Inativo",
	PENDING: "Pendente",
};

export function CollaboratorsTableRow({
	companyMember,
}: CollaboratorsTableRowProps) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell className="text-nowrap">
				{companyMember.user.name}
			</TableCell>
			<TableCell>
				<CopyButton
					data={companyMember.user.email}
					title="Copiar e-mail"
				>
					{companyMember.user.email}
				</CopyButton>
			</TableCell>
			<TableCell className="text-nowrap">
				<Badge
					data-active={companyMember.status === "ACTIVE"}
					data-inactive={companyMember.status === "INACTIVE"}
					data-pending={companyMember.status === "PENDING"}
					className="data-[active=true]:text-emerald-500 data-[inactive=true]:text-rose-500 data-[pending=true]:text-amber-500 data-[active=true]:bg-emerald-500/15 data-[inactive=true]:bg-rose-500/15 data-[pending=true]:bg-amber-500/15"
				>
					{COMPANY_MEMBER_STATUS[companyMember.status]}
				</Badge>
			</TableCell>
			<TableCell>{companyMember.sector}</TableCell>
			<TableCell>
				<CollaboratorPermissionsDropdown
					permissions={companyMember.extraData.permissions}
				/>
			</TableCell>
			<TableCell>
				{formatBrazilianDate(companyMember.createdAt)}
			</TableCell>
			<TableCell className="text-right">
				<Button variant="ghost">
					<Ellipsis className="size-4" />
				</Button>
			</TableCell>
		</TableRow>
	);
}
