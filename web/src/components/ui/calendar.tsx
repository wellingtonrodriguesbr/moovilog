"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			locale={ptBR}
			className={cn("p-3", className)}
			classNames={{
				nav: "flex items-center justify-between",
				caption_label:
					"absolute top-4 left-1/2 -translate-x-1/2 text-app-blue-950 text-lg font-medium capitalize",
				month: "flex flex-col gap-4",
				month_grid: "flex flex-col",
				weekdays: "grid grid-cols-7",
				weekday: "text-xs font-normal text-zinc-600",
				day: "text-sm size-4 text-app-blue-950 hover:bg-zinc-100 rounded-md font-medium",
				day_button: "size-8",
				today: "text-app-blue-500",
				outside: "text-zinc-400 font-normal",
				selected: "bg-zinc-100 text-app-blue-500",
				chevron: "hidden",
			}}
			components={{
				PreviousMonthButton(props) {
					return (
						<Button
							{...props}
							type="button"
							variant="outline"
							className="p-1.5 h-auto mr-2"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
					);
				},
				NextMonthButton(props) {
					return (
						<Button
							{...props}
							type="button"
							variant="outline"
							className="p-1.5 h-auto"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					);
				},
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
