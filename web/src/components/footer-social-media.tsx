import Link from "next/link";

import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { links } from "@/utils/links";

export function FooterSocialMedia() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={links["request-demo"]}
        target="_blank"
        className="flex items-center justify-center size-10 rounded-full bg-app-blue-700 hover:bg-app-blue-500"
      >
        <WhatsappIcon className="size-5 fill-white" />
      </Link>
      <Link
        href={links["instagram"]}
        target="_blank"
        className="flex items-center justify-center size-10 rounded-full bg-app-blue-700 hover:bg-app-blue-500"
      >
        <InstagramIcon className="size-6 fill-white" />
      </Link>
      <Link
        href={links["linkedin"]}
        target="_blank"
        className="flex items-center justify-center size-10 rounded-full bg-app-blue-700 hover:bg-app-blue-500"
      >
        <LinkedinIcon className="size-6 fill-white" />
      </Link>
    </div>
  );
}
