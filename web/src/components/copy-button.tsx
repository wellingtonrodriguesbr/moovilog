"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { ReactNode, useState } from "react";

interface CopyButtonProps {
	children: ReactNode;
	title: string;
	data: string;
}

export function CopyButton({ children, data, title }: CopyButtonProps) {
	const [copyEmail, setCopyEmail] = useState(false);

	async function handleCopyData(data: string) {
		await navigator.clipboard.writeText(data);
		setCopyEmail(true);

		setTimeout(() => {
			setCopyEmail(false);
		}, 1000);
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={() => handleCopyData(data)}
						variant="secondary"
						className="gap-2"
					>
						{copyEmail ? (
							<Check className="size-4 text-app-blue-500" />
						) : (
							<Copy className="size-4" />
						)}
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
