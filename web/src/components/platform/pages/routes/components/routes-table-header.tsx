import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function RoutesTableHeader() {
	return (
		<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
			<TableRow className="hover:bg-zinc-100">
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Código da rota
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
					Nome
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cidades
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrada por
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrada em
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
			</TableRow>
		</TableHeader>
	);
}
