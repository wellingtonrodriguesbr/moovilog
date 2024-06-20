import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";

const data = [
  {
    id: "INV001",
    name: "Wellington Rodrigues",
    email: "moovilog@gmail.com",
    sector: "Tecnologia",
    role: "ADMIN",
    createdAt: "20/06/2024",
  },
  {
    id: "INV002",
    name: "Wellington Rodrigues",
    email: "moovilog@gmail.com",
    sector: "Tecnologia",
    role: "ADMIN",
    createdAt: "20/06/2024",
  },
  {
    id: "INV003",
    name: "Wellington Rodrigues",
    email: "moovilog@gmail.com",
    sector: "Tecnologia",
    role: "ADMIN",
    createdAt: "20/06/2024",
  },
  {
    id: "INV004",
    name: "Wellington Rodrigues",
    email: "moovilog@gmail.com",
    sector: "Tecnologia",
    role: "ADMIN",
    createdAt: "20/06/2024",
  },
  {
    id: "INV005",
    name: "Wellington Rodrigues",
    email: "moovilog@gmail.com",
    sector: "Tecnologia",
    role: "ADMIN",
    createdAt: "20/06/2024",
  },
];

export function VehiclesTable() {
  return (
    <Table>
      <TableHeader className="bg-app-blue-500 hover:bg-app-blue-500">
        <TableRow className="hover:bg-app-blue-500">
          <TableHead className="text-white font-medium rounded-tl-lg text-nowrap">
            ID do colaborador
          </TableHead>
          <TableHead className="text-white font-medium">Nome</TableHead>
          <TableHead className="text-white font-medium">E-mail</TableHead>
          <TableHead className="text-white font-medium">Setor</TableHead>
          <TableHead className="text-white font-medium">Autorização</TableHead>
          <TableHead className="text-white font-medium">Desde</TableHead>
          <TableHead className="text-white font-medium rounded-tr-lg"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="hover:bg-transparent" key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="text-nowrap">{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.sector}</TableCell>
            <TableCell>{item.role}</TableCell>
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
