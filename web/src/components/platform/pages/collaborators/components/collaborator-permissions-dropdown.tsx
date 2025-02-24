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
import { USER_PERMISSIONS } from "@/utils/mocks/user-permissions";
import { Eye } from "lucide-react";

interface CollaboratorPermissionsDropdownProps {
	permissions: CompanyMember["companyMemberPermissions"];
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
						USER_PERMISSIONS.find(
							(p) =>
								p.key ===
								(data.permission as keyof typeof USER_PERMISSIONS)
						)?.label || data.permission;
					return (
						<DropdownMenuItem key={data.id}>
							{permissionLabel}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
