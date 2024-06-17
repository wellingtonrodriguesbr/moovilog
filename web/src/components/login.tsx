import Image from "next/image";
import Link from "next/link";

import { SelectAccountType } from "./select-account-type";
import { ArrowLeft } from "lucide-react";
import { FooterSocialMedia } from "./footer-social-media";

export function Login() {
  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-3 p-2">
      <div className="hidden xl:block relative bg-app-blue-500 rounded-md col-span-2 overflow-hidden"></div>
      <div className="relative flex flex-col justify-center items-center gap-4 px-4 xl:px-24">
        <header className="absolute top-16 left-1/2 -translate-x-1/2 mb-2">
          <Image
            src="/logo-blue.svg"
            alt="moovilog"
            className="w-[200px]"
            width={250}
            height={193}
          />
        </header>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="size-4" /> Voltar
        </Link>
        <h1 className="font-semibold text-2xl md:text-3xl my-8">
          Escolha o tipo de conta
        </h1>
        <SelectAccountType />
        <footer className="w-full flex items-center justify-between absolute bottom-12 px-4 md:px-24">
          <FooterSocialMedia />
          <p className="text-sm text-zinc-500">© Moovilog 2024</p>
        </footer>
      </div>
    </div>
  );
}
