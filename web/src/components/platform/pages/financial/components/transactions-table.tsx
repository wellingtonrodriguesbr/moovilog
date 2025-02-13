"use client";

import { Table, TableBody } from "@/components/ui/table";
import { useFetchTransactionsFromCompany } from "@/hooks/financial/use-fetch-transactions-from-company";
import { SkeletonTransactionsTable } from "@/components/platform/pages/financial/components/skeleton-transactions-table";
import { TransactionsTableRow } from "@/components/platform/pages/financial/components/transactions-table-row";
import { TransactionsTableHeader } from "@/components/platform/pages/financial/components/transactions-table-header";
import { Empty } from "@/components/platform/empty";

export function TransactionsTable() {
	const { transactionsFromCompany, isFetchTransactionsFromCompanyPending } =
		useFetchTransactionsFromCompany();

	if (isFetchTransactionsFromCompanyPending) {
		return <SkeletonTransactionsTable />;
	}

	if (transactionsFromCompany.length > 0) {
		return (
			<Table>
				<TransactionsTableHeader />
				<TableBody>
					{transactionsFromCompany.map((transaction) => (
						<TransactionsTableRow
							key={transaction.id}
							transaction={transaction}
						/>
					))}
				</TableBody>
			</Table>
		);
	}

	return <Empty context="financial" />;
}
