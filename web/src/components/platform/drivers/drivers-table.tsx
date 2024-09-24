import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";
import { Ellipsis } from "lucide-react";

const data = [
	{
		id: "INV001",
		name: "Wellington Rodrigues",
		documentNumber: "00000000000",
		phone: "15981036058",
		backupPhone: "-",
		createdAt: "20/06/2024",
	},
	{
		id: "INV002",
		name: "Wellington Rodrigues",
		documentNumber: "00000000000",
		phone: "15981036058",
		backupPhone: "-",
		createdAt: "20/06/2024",
	},
	{
		id: "INV003",
		name: "Wellington Rodrigues",
		documentNumber: "00000000000",
		phone: "15981036058",
		backupPhone: "-",
		createdAt: "20/06/2024",
	},
	{
		id: "INV004",
		name: "Wellington Rodrigues",
		documentNumber: "00000000000",
		phone: "15981036058",
		backupPhone: "-",
		createdAt: "20/06/2024",
	},
	{
		id: "INV005",
		name: "Wellington Rodrigues",
		documentNumber: "00000000000",
		phone: "15981036058",
		backupPhone: "-",
		createdAt: "20/06/2024",
	},
];

export function DriversTable() {
	return (
		<Table>
			<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
				<TableRow className="hover:bg-zinc-100">
					<TableHead className="text-app-blue-900 font-medium rounded-tl-lg text-nowrap">
						Nome
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						CPF
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						Contato
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						Contato reserva
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						Cadastrado em
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<TableRow className="hover:bg-transparent" key={item.id}>
						<TableCell className="text-nowrap">
							{item.name}
						</TableCell>
						<TableCell>
							<CopyButton
								data={item.documentNumber}
								title="Copiar CPF"
							>
								{formatCPF(item.documentNumber)}
							</CopyButton>
						</TableCell>
						<TableCell>{formatPhone(item.phone)}</TableCell>
						<TableCell>{item.backupPhone}</TableCell>
						<TableCell>{item.createdAt}</TableCell>
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
