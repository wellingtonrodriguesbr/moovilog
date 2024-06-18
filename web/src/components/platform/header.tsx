import Image from "next/image";

import { AccountMenu } from "./account-menu";
import { ButtonOpenCloseSidebar } from "./button-open-close-sidebar";
import { Separator } from "../ui/separator";

export function HeaderPlatform() {
  return (
    <header className="col-span-full h-[72px] lg:h-[80px] px-4 border-b flex justify-between items-center bg-zinc-50">
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
