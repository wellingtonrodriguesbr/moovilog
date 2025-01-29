// src/components/multi-select.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Area } from "@/hooks/use-fetch-areas-by-states";

const multiSelectAreasVariants = cva("m-1 text-app-blue-900", {
	variants: {
		variant: {
			default:
				"border-foreground/10 text-white bg-app-blue-500 hover:bg-app-blue-600",
			secondary:
				"border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
			destructive:
				"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
			inverted: "inverted",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface MultiSelectAreasProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof multiSelectAreasVariants> {
	options: Area[];
	onAreasChange: (id: string[]) => void;
	defaultValues?: string[];
	placeholder?: string;
	maxCount?: number;
	modalPopover?: boolean;
	asChild?: boolean;
	className?: string;
}

export const MultiSelectAreas = React.forwardRef<
	HTMLButtonElement,
	MultiSelectAreasProps
>(
	(
		{
			options,
			onAreasChange,
			variant,
			defaultValues = [],
			placeholder = "Clique para selecionar",
			maxCount = 3,
			modalPopover = false,
			asChild = false,
			className,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] =
			React.useState<string[]>(defaultValues);
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

		const handleInputKeyDown = (
			event: React.KeyboardEvent<HTMLInputElement>
		) => {
			if (event.key === "Enter") {
				setIsPopoverOpen(true);
			} else if (event.key === "Backspace" && !event.currentTarget.name) {
				const newSelectedAreas = [...selectedValues];
				newSelectedAreas.pop();
				setSelectedValues(newSelectedAreas);
				onAreasChange(newSelectedAreas);
			}
		};

		const toggleOption = (id: string) => {
			const newSelectedAreas = selectedValues.includes(id)
				? selectedValues.filter((selectedId) => selectedId !== id)
				: [...selectedValues, id];
			setSelectedValues(newSelectedAreas);
			onAreasChange(newSelectedAreas);
		};

		const handleClear = () => {
			setSelectedValues([]);
			onAreasChange([]);
		};

		const handleTogglePopover = () => {
			setIsPopoverOpen((prev) => !prev);
		};

		const clearExtraOptions = () => {
			const newSelectedNames = selectedValues.slice(0, maxCount);
			setSelectedValues(newSelectedNames);
			onAreasChange(newSelectedNames);
		};

		const toggleAll = () => {
			if (selectedValues.length === options.length) {
				handleClear();
			} else {
				const allNames = options.map((option) => option.id);
				setSelectedValues(allNames);
				onAreasChange(allNames);
			}
		};

		return (
			<Popover
				open={isPopoverOpen}
				onOpenChange={setIsPopoverOpen}
				modal={modalPopover}
			>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						{...props}
						onClick={handleTogglePopover}
						className={cn(
							"flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
							className
						)}
					>
						{selectedValues.length > 0 ? (
							<div className="flex justify-between items-center w-full">
								<div className="flex flex-wrap items-center">
									{selectedValues
										.slice(0, maxCount)
										.map((id) => {
											const option = options.find(
												(o) => o.id === id
											);
											return (
												<Badge
													key={id}
													className={cn(
														multiSelectAreasVariants(
															{
																variant,
															}
														)
													)}
												>
													{option?.name}
													<XCircle
														className="ml-2 h-4 w-4 cursor-pointer"
														onClick={(event) => {
															event.stopPropagation();
															toggleOption(id);
														}}
													/>
												</Badge>
											);
										})}
									{selectedValues.length > maxCount && (
										<Badge
											className={cn(
												"bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
												multiSelectAreasVariants({
													variant,
												})
											)}
										>
											{`+ ${selectedValues.length - maxCount} selecionados`}
											<XCircle
												className="ml-2 h-4 w-4 cursor-pointer"
												onClick={(event) => {
													event.stopPropagation();
													clearExtraOptions();
												}}
											/>
										</Badge>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="h-4 mx-2 cursor-pointer text-app-blue-900"
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									<Separator
										orientation="vertical"
										className="flex min-h-6 h-full"
									/>
									<ChevronDown className="h-4 mx-2 cursor-pointer text-app-blue-900" />
								</div>
							</div>
						) : (
							<div className="flex items-center justify-between w-full mx-auto">
								<span className="text-sm text-zinc-600 font-normal mx-3">
									{placeholder}
								</span>
								<ChevronDown className="h-4 cursor-pointer text-zinc-600 mx-2" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto md:min-w-[400px] p-0"
					align="start"
					onEscapeKeyDown={() => setIsPopoverOpen(false)}
				>
					<Command>
						<CommandInput
							placeholder="Pesquisar..."
							onKeyDown={handleInputKeyDown}
						/>
						<CommandList>
							<CommandEmpty>
								Nenhum resultado encontrado.
							</CommandEmpty>
							<CommandGroup>
								<CommandItem
									key="all"
									onSelect={toggleAll}
									className="cursor-pointer"
								>
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
											selectedValues.length ===
												options?.length
												? "bg-primary text-primary-foreground"
												: "opacity-50 [&_svg]:invisible"
										)}
									>
										<CheckIcon className="size-4 text-app-blue-500" />
									</div>
									<span>(Selecionar Todos)</span>
								</CommandItem>
								{options?.map((option) => {
									const isSelected = selectedValues.includes(
										option.id
									);
									return (
										<CommandItem
											key={option.id}
											onSelect={() =>
												toggleOption(option.id)
											}
											className="cursor-pointer"
										>
											<div
												className={cn(
													"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
													isSelected
														? "bg-primary text-primary-foreground"
														: "opacity-50 [&_svg]:invisible"
												)}
											>
												<CheckIcon className="size-4 text-app-blue-500" />
											</div>
											<span>
												({option.code}) {option.name}
											</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<>
											<CommandItem
												onSelect={handleClear}
												className="flex-1 justify-center cursor-pointer"
											>
												Limpar
											</CommandItem>
											<Separator
												orientation="vertical"
												className="flex min-h-6 h-full"
											/>
										</>
									)}
									<CommandItem
										onSelect={() => setIsPopoverOpen(false)}
										className="flex-1 justify-center cursor-pointer max-w-full"
									>
										Fechar
									</CommandItem>
								</div>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);

MultiSelectAreas.displayName = "MultiSelectAreas";
