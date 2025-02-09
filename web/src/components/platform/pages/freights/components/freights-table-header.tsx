import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function FreightsTableHeader() {
	return (
		<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
			<TableRow className="hover:bg-zinc-100">
				<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
					Data do frete
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Quantidade de entregas
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Peso total de entregas
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Quantidade de coletas
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Peso total de coletas
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Tipo
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Modalidade
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrado em
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
			</TableRow>
		</TableHeader>
	);
}
