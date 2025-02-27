"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
	selectedDate: Date;
	disabled?: boolean;
	onChangeSelectedDate: (date: Date) => void;
}

export function DatePicker({
	selectedDate,
	disabled = false,
	onChangeSelectedDate,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"justify-start text-left font-normal bg-white rounded-md",
						!selectedDate && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selectedDate ? (
						dayjs(selectedDate)
							.locale("pt-br")
							.format("D [de] MMMM [de] YYYY")
					) : (
						<span>Selecione uma data</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					required
					selected={selectedDate}
					onSelect={onChangeSelectedDate}
					disabled={disabled}
				/>
			</PopoverContent>
		</Popover>
	);
}
