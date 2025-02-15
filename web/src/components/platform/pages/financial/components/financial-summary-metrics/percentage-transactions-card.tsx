import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { financialHealth } from "@/utils/financial-health";
import { Activity, Info } from "lucide-react";

interface PercentageTransactionsCardProps {
	percentageTransactions: number;
}

export function PercentageTransactionsCard({
	percentageTransactions,
}: PercentageTransactionsCardProps) {
	return (
		<Card className="h-48 bg-zinc-100 relative">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-5xl">
					{percentageTransactions}%
				</CardTitle>
				<CardDescription className="text-zinc-600">
					Porcentagem de lucro
				</CardDescription>
				<Activity
					data-financialHealth={financialHealth(
						percentageTransactions
					)}
					className="size-8 absolute top-4 right-4 animate-pulse data-[financialHealth=Prejuízo]:text-rose-600 data-[financialHealth=Crítica]:text-orange-500 data-[financialHealth=Regular]:text-amber-400 data-[financialHealth=Boa]:text-app-blue-600 data-[financialHealth=Extraordinária]:text-emerald-600"
				/>
			</CardHeader>
			<CardContent>
				<p className="text-sm">
					A saúde financeira do seu negócio está{" "}
					<strong
						data-financialHealth={financialHealth(
							percentageTransactions
						)}
						className="data-[financialHealth=Prejuízo]:text-rose-600 data-[financialHealth=Crítica]:text-orange-500 data-[financialHealth=Regular]:text-amber-400 data-[financialHealth=Boa]:text-app-blue-600 data-[financialHealth=Extraordinária]:text-emerald-600"
					>
						{financialHealth(percentageTransactions)}.
						<Tooltip>
							<TooltipTrigger className="ml-1">
								<Info className="size-5 fill-zinc-400 stroke-zinc-100" />
							</TooltipTrigger>
							<TooltipContent>
								<ul className="text-sm space-y-2">
									<li>
										🏆 <strong>Extraordinária</strong>:
										Acima de <strong>90%</strong>
									</li>
									<li>
										🟢 <strong>Ótima</strong>: Entre{" "}
										<strong>80% e 90%</strong>
									</li>
									<li>
										🔵 <strong>Boa</strong>: Entre{" "}
										<strong>50% e 79%</strong>
									</li>
									<li>
										🟡 <strong>Regular</strong>: Entre{" "}
										<strong>20% e 49%</strong>
									</li>
									<li>
										🟠 <strong>Crítica</strong>: Entre{" "}
										<strong>0% e 19%</strong>
									</li>
									<li>
										🔴 <strong>Prejuízo</strong>: Abaixo de{" "}
										<strong>0%</strong>
									</li>
								</ul>
							</TooltipContent>
						</Tooltip>
					</strong>
				</p>
			</CardContent>
		</Card>
	);
}
