import Image from "next/image";
import Link from "next/link";

import { SelectAccountType } from "./select-account-type";
import { ArrowLeft } from "lucide-react";
import { FooterSocialMedia } from "./footer-social-media";

export function Login() {
  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-3 p-2">
      <div className="hidden xl:block relative bg-app-blue-500 rounded-md col-span-2 overflow-hidden"></div>

      <div className="flex flex-col px-4 xl:px-24 pb-12">
        <div className="relative w-full flex flex-col gap-4 justify-start md:justify-center flex-1">
          <header className="relative md:absolute md:top-16 md:left-1/2 md:-translate-x-1/2 mb-12 pt-6 md:pt-0">
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
          <h1 className="font-semibold text-2xl md:text-3xl my-4 md:my-8">
            Escolha o tipo de conta
          </h1>
          <SelectAccountType />
        </div>

        <footer className="w-full flex items-center justify-between mt-auto">
          <FooterSocialMedia />
          <p className="text-sm text-zinc-500">© Moovilog 2024</p>
        </footer>
      </div>
    </div>
  );
}
