import Link from "next/link";
import { links } from "@/utils/links";

import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export function FloatingWhatsAppButton() {
	return (
		<Link
			href={links["whatsapp-doubts"]}
			className="fixed bottom-8 right-8 z-50 bg-emerald-400 hover:bg-emerald-500 transition-colors rounded-full p-2 before:absolute before:w-10 before:h-10 before:bg-white before:rounded-full before:animate-ping"
		>
			<WhatsappIcon className="size-10" />
		</Link>
	);
}
