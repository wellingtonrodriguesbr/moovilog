import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DriversTableHeader() {
	return (
		<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
			<TableRow className="hover:bg-zinc-100">
				<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
					Nome
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					CPF
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Contato
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Tipo
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Status da conta do motorista
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrado em
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
			</TableRow>
		</TableHeader>
	);
}
