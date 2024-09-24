import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { formatPlate } from "@/utils/format-plate";

const data = [
	{
		plate: "BIS1611",
		driverName: "Wellington Rodrigues",
		ownerName: "Wellington Rodrigues",
		category: "Truck",
		type: "Terceirizado",
		body: "Fechada",
		createdAt: "20/06/2024",
		fullLoadCapacity: "4 toneladas",
	},
	{
		plate: "BIS1611",
		driverName: "Wellington Rodrigues",
		ownerName: "Wellington Rodrigues",
		category: "Truck",
		type: "Terceirizado",
		body: "Fechada",
		createdAt: "20/06/2024",
		fullLoadCapacity: "4 toneladas",
	},
	{
		plate: "BIS1611",
		driverName: "Wellington Rodrigues",
		ownerName: "Wellington Rodrigues",
		category: "Truck",
		type: "Terceirizado",
		body: "Fechada",
		createdAt: "20/06/2024",
		fullLoadCapacity: "4 toneladas",
	},
	{
		plate: "BIS1611",
		driverName: "Wellington Rodrigues",
		ownerName: "Wellington Rodrigues",
		category: "Truck",
		type: "Terceirizado",
		body: "Fechada",
		createdAt: "20/06/2024",
		fullLoadCapacity: "4 toneladas",
	},
	{
		plate: "BIS1611",
		driverName: "Wellington Rodrigues",
		ownerName: "Wellington Rodrigues",
		category: "Truck",
		type: "Terceirizado",
		body: "Fechada",
		createdAt: "20/06/2024",
		fullLoadCapacity: "4 toneladas",
	},
];

export function VehiclesTable() {
	return (
		<Table>
			<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
				<TableRow className="hover:bg-zinc-100">
					<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
						Placa
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium text-nowrap">
						Proprietário
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium text-nowrap">
						Motorista
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
						Tara
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium text-nowrap">
						Cadastro em
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, index) => (
					<TableRow className="hover:bg-transparent" key={index}>
						<TableCell className="text-nowrap">
							{formatPlate(item.plate)}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.ownerName}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.driverName}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.category}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.type}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.body}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.fullLoadCapacity}
						</TableCell>
						<TableCell className="text-nowrap">
							{item.createdAt}
						</TableCell>
						<TableCell className="text-right">
							<Button variant="ghost">
								<Ellipsis className="size-4" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
