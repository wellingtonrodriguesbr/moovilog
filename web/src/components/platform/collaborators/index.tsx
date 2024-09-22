import { CollaboratorsTable } from "./collaborators-table";
import { RegisterNewCollaboratorDialog } from "./register-new-collaborator-dialog";

export function Collaborators() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-4xl font-medium">
					Colaboradores
				</h1>
				<RegisterNewCollaboratorDialog />
			</header>
			<div className="mt-12">
				<CollaboratorsTable />
			</div>
		</section>
	);
}
