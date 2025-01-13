"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export function ScrollToTopButton() {
	return (
		<Button
			onClick={() =>
				window.scrollTo({
					behavior: "smooth",
					top: 0,
				})
			}
			className="p-0 size-10 rounded-full bg-app-blue-700 hover:bg-app-blue-500 text-white"
		>
			<ArrowUp className="size-5" />
		</Button>
	);
}
