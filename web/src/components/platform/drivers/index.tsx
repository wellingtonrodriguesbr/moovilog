import { DriversTable } from "./drivers-table";
import { RegisterDriverDialog } from "./register-driver-dialog";

export function Drivers() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-4xl font-medium">Motoristas</h1>
				<RegisterDriverDialog />
			</header>
			<div className="mt-12">
				<DriversTable />
			</div>
		</section>
	);
}
