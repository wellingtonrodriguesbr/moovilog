import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Freights() {
	return (
		<section>
			<header className="flex gap-4 items-start md:items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-medium">Fretes</h1>
				<Button asChild>
					<Link href="/fretes/novo">
						<Plus className="size-4" />
						Cadastrar novo
					</Link>
				</Button>
			</header>
		</section>
	);
}
