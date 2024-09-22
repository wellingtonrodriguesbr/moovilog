"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useFetchCompanyMembers } from "@/hooks/use-fetch-company-members";
import { ButtonToCopyEmail } from "./button-to-copy-email";
import { Ellipsis, Info } from "lucide-react";

import dayjs from "dayjs";

const COMPANY_MEMBER_ROLE: Record<string, string> = {
	ADMIN: "Administrador",
	FINANCIAL: "Financeiro",
};

export function CollaboratorsTable() {
	const { companyMembers, isFetchCompanyMembersPending } =
		useFetchCompanyMembers();

	if (isFetchCompanyMembersPending || !companyMembers) {
		return null;
	}

	return (
		<Table>
			<TableHeader className="bg-zinc-100 hover:bg-zinc-100">
				<TableRow className="hover:bg-zinc-100">
					<TableHead className="text-app-blue-900 font-medium rounded-tl-lg">
						Nome
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium pl-8">
						E-mail
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						Setor
					</TableHead>
					<TableHead className="flex items-center gap-2 text-app-blue-900 font-medium">
						Cargo
						<Tooltip defaultOpen={true}>
							<TooltipTrigger className="mt-1">
								<Info className="size-4" />
							</TooltipTrigger>
							<TooltipContent className="max-w-64">
								<p className="font-normal text-zinc-700">
									O{" "}
									<strong className="underline">cargo</strong>{" "}
									refere-se as permissões que este usuário
									poderá realizar dentro da conta da empresa.
								</p>
							</TooltipContent>
						</Tooltip>
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium">
						Desde
					</TableHead>
					<TableHead className="text-app-blue-900 font-medium rounded-tr-lg"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{companyMembers.map((companyMember) => (
					<TableRow
						className="hover:bg-transparent"
						key={companyMember.id}
					>
						<TableCell className="text-nowrap">
							{companyMember.member.name}
						</TableCell>
						<TableCell>
							<ButtonToCopyEmail
								email={companyMember.member.email}
							/>
						</TableCell>
						<TableCell>-</TableCell>
						<TableCell>
							{COMPANY_MEMBER_ROLE[companyMember.role]}
						</TableCell>
						<TableCell>
							{dayjs(companyMember.createdAt).format(
								"DD/MM/YYYY"
							)}
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
