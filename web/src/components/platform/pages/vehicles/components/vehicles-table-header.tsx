import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function VehiclesTableHeader() {
	return (
		<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
			<TableRow className="hover:bg-zinc-100">
				<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
					Placa (cavalo)
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
					Placa (reboque)
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Marca
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Modelo
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Categoria
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Tipo
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Carroceria
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Capacidade máxima
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrado em
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
			</TableRow>
		</TableHeader>
	);
}
