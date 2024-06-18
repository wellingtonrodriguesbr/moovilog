import { AccountMenu } from "./account-menu";

export function HeaderPlatform() {
  return (
    <header className="flex justify-end items-center bg-zinc-50 w-full h-20 border-b px-12">
      <AccountMenu />
    </header>
  );
}
