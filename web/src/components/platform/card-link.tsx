import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface CardLinkProps {
	title: string;
	description: string;
	link: string;
}

export function CardLink({ title, description, link }: CardLinkProps) {
	return (
		<Link href={link} className="group">
			<Card className="border border-transparent group-hover:border-zinc-200">
				<CardHeader className="relative gap-2">
					<CardTitle className="flex items-center gap-2">
						{title}
					</CardTitle>
					<CardDescription className="text-zinc-600">
						{description}
					</CardDescription>
					<ArrowUpRight className="absolute top-4 right-4 group-hover:text-app-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</Link>
	);
}
