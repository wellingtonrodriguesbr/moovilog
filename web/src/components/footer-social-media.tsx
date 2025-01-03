import Link from "next/link";

import { WhatsappIcon } from "./icons/whatsapp-icon";
import { InstagramIcon } from "./icons/instagram-icon";
import { LinkedinIcon } from "./icons/linkedin-icon";

export function FooterSocialMedia() {
	return (
		<div className="flex items-center gap-2">
			<Link
				href=""
				className="flex items-center justify-center size-10 rounded-full bg-zinc-100/50 hover:bg-zinc-100"
			>
				<WhatsappIcon className="size-4 fill-app-blue-500" />
			</Link>
			<Link
				href="https://www.instagram.com/moovilog"
				className="flex items-center justify-center size-10 rounded-full bg-zinc-100/50 hover:bg-zinc-100"
			>
				<InstagramIcon className="size-5 fill-app-blue-500" />
			</Link>
			<Link
				href="https://www.linkedin.com/company/moovilog"
				className="flex items-center justify-center size-10 rounded-full bg-zinc-100/50 hover:bg-zinc-100"
			>
				<LinkedinIcon className="size-5 fill-app-blue-500" />
			</Link>
		</div>
	);
}
