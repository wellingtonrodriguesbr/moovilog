import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Empty } from "@/components/platform/empty";

export function Financial() {
	return (
		<section className="flex flex-col gap-12">
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Financeiro</h1>
				<Button>
					<Plus className="size-4" />
					Cadastrar transação
				</Button>
			</header>
			<div>
				<Empty context="financial" />
			</div>
		</section>
	);
}
