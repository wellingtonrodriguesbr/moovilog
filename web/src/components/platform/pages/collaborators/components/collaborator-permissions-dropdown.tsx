import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompanyMember } from "@/interfaces";
import { COMPANY_MEMBER_PERMISSIONS } from "@/utils/mocks/company-member-permissions";
import { Eye } from "lucide-react";

interface CollaboratorPermissionsDropdownProps {
	permissions: CompanyMember["extraData"]["permissions"];
}

export function CollaboratorPermissionsDropdown({
	permissions,
}: CollaboratorPermissionsDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<Eye className="size-4" />
					Ver permissiões
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					Permissões deste colaborador
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{permissions?.map((data) => {
					const permissionLabel =
						COMPANY_MEMBER_PERMISSIONS.find((p) => p.key === data)
							?.label || data;
					return (
						<DropdownMenuItem key={data}>
							{permissionLabel}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
