import Image from "next/image";

import { AccountMenu } from "./account-menu";
import { ButtonOpenCloseSidebar } from "./button-open-close-sidebar";
import { Separator } from "../ui/separator";

export function HeaderPlatform() {
  return (
    <header className="flex justify-between items-center sticky top-0 left-0 bg-zinc-50 w-full h-20 border-b px-4 z-[9999]">
      <div className="flex items-center gap-4">
        <ButtonOpenCloseSidebar />
        <Separator className="w-px h-8 bg-zinc-200" />
        <Image
          src="/logo-blue.svg"
          alt="moovilog"
          className="w-[150px]"
          width={250}
          height={193}
        />
      </div>
      <AccountMenu />
    </header>
  );
}
