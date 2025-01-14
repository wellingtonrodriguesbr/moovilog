import Link from "next/link";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import { links } from "@/utils/links";

export function Faq() {
	return (
		<section className="w-full max-w-screen-2xl px-4 mx-auto pt-12 md:pt-36">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
				<div className="flex flex-col gap-3">
					<small className="flex items-center gap-1 mb-2 before:w-8 before:h-[1px] before:bg-app-blue-300">
						FAQ
					</small>
					<h4 className="text-2xl md:text-4xl font-semibold">
						Dúvidas frequentes
					</h4>
					<p className="text-sm text-app-gray-600 max-w-xl">
						Se ficou com alguma dúvida, entre em contato através do
						nosso e-mail ou Whatsapp:
					</p>

					<div className="w-12 h-[1px] bg-zinc-300"></div>

					<div className="flex flex-col gap-4 mt-2">
						<Link
							href="mailto:moovilog@gmail.com"
							className="w-fit underline text-sm text-app-gray-700 font-medium flex items-center gap-2 group"
						>
							moovilog@gmail.com
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>

						<Link
							href={links["whatsapp-doubts"]}
							className="w-fit underline text-sm text-app-blue-500 font-medium flex items-center gap-2 group"
						>
							Chamar no Whatsapp
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>
					</div>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{accordionData.map(({ value, trigger, content }) => (
						<AccordionItem key={value} value={value}>
							<AccordionTrigger className="underline-0 hover:no-underline">
								{trigger}
							</AccordionTrigger>
							<AccordionContent>{content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

const accordionData = Array.from({ length: 6 }, (_, index) => ({
	value: `item-${index + 1}`,
	trigger: "Lorem Ipsum",
	content:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));
