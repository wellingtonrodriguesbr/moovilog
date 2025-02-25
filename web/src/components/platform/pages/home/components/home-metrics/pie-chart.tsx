"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
	{ type: "fractional", quantity: 112, fill: "var(--color-fractional)" },
	{ type: "dedicated", quantity: 31, fill: "var(--color-dedicated)" },
	{ type: "express", quantity: 9, fill: "var(--color-express)" },
	{ type: "transfer", quantity: 130, fill: "var(--color-transfer)" },
];

const chartConfig = {
	quantity: {
		label: "Quantidade",
	},
	fractional: {
		label: "Fracionado",
		color: "hsl(var(--chart-1))",
	},
	dedicated: {
		label: "Dedicado",
		color: "hsl(var(--chart-2))",
	},
	express: {
		label: "Entrega rápida",
		color: "hsl(var(--chart-3))",
	},
	transfer: {
		label: "Transferência",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig;

export function PieChartComponent() {
	const totalFreights = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.quantity, 0);
	}, []);

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Fretes registrados</CardTitle>
				<CardDescription>Fevereiro de 2025</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="quantity"
							nameKey="type"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalFreights.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Fretes
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Um aumento de 5.2% em relação ao mês passado
					<TrendingUp className="h-4 w-4 text-emerald-500" />
				</div>
			</CardFooter>
		</Card>
	);
}
