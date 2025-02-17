"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackPageButtonProps {
	href?: string;
}

export function BackPageButton({ href }: BackPageButtonProps) {
	const router = useRouter();

	function handleBackPage() {
		if (href) {
			router.push(href);
		} else {
			router.back();
		}
	}

	return (
		<Button
			className="w-fit flex items-center gap-2 hover:underline text-sm group ml-0 pl-0"
			variant="link"
			onClick={handleBackPage}
		>
			<ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
			Voltar
		</Button>
	);
}
