import { Button } from "@/components/ui/button";
import { Empty } from "@/components/platform/empty";
import { Plus } from "lucide-react";

export function Pickups() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Coletas</h1>
				<Button>
					<Plus className="size-4" />
					Cadastrar coleta
				</Button>
			</header>
			<div className="mt-12">
				<Empty context="pickup" />
			</div>
		</section>
	);
}
