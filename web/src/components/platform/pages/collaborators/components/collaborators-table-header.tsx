import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function CollaboratorsTableHeader() {
	return (
		<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
			<TableRow className="hover:bg-zinc-100">
				<TableHead className="text-app-blue-900 font-medium text-nowrap rounded-tl-lg">
					Nome
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					E-mail
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Status da conta
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Setor
				</TableHead>
				<TableHead className="flex items-center gap-2 text-app-blue-900 font-medium">
					Permissão
					<Tooltip delayDuration={0} defaultOpen>
						<TooltipTrigger className="mt-1">
							<Info className="size-4" />
						</TooltipTrigger>
						<TooltipContent className="max-w-64">
							<p className="font-normal text-zinc-700">
								Refere-se as permissões que este usuário poderá
								realizar dentro da conta da empresa.
							</p>
						</TooltipContent>
					</Tooltip>
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium text-nowrap">
					Cadastrado em
				</TableHead>
				<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
			</TableRow>
		</TableHeader>
	);
}
