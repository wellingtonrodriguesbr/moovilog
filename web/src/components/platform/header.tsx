import Image from "next/image";

import { AccountMenu } from "./account-menu";
import { ButtonOpenCloseSidebar } from "./button-open-close-sidebar";

export function HeaderPlatform() {
  return (
    <header className="col-span-full h-20 px-4 border-b flex justify-between items-center bg-zinc-50">
      <div className="flex items-center gap-4">
        <ButtonOpenCloseSidebar />
        <Image
          src="/logo-blue.svg"
          alt="moovilog"
          className="hidden md:block w-[150px]"
          width={250}
          height={193}
        />
      </div>
      <Image
        src="/logo-blue.svg"
        alt="moovilog"
        className="block md:hidden w-[120px]"
        width={250}
        height={193}
      />
      <AccountMenu />
    </header>
  );
}
