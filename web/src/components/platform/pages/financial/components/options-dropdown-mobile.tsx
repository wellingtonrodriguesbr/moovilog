import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RegisterTransactionDialog } from "@/components/platform/pages/financial/components/register-transaction-dialog";
import { Calculator, Menu } from "lucide-react";

export function OptionsDropdownMobile() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<Menu className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>O que você quer fazer?</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<div className="flex flex-col gap-2">
					<DropdownMenuItem className="rounded-md" asChild>
						<Button variant="secondary" asChild>
							<Link href="/financeiro/fechamento">
								<Calculator className="size-4" />
								Fazer fechamento do mês
							</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<RegisterTransactionDialog />
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
