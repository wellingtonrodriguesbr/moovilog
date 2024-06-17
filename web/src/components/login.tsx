import Image from "next/image";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Login() {
  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-3">
      <div className="hidden xl:block relative bg-app-blue-500 col-span-2">
        <header className="absolute top-12 left-4 xl:left-24 mb-2">
          <Image
            src="/logo.svg"
            alt="moovilog"
            className="w-[200px]"
            width={250}
            height={193}
          />
        </header>
      </div>
      <div className="relative flex flex-col justify-center items-center gap-4 px-4 xl:px-24">
        <header className="block xl:hidden absolute top-12 left-1/2 -translate-x-1/2 mb-2">
          <Image
            src="/logo-blue.svg"
            alt="moovilog"
            className="w-[200px]"
            width={250}
            height={193}
          />
        </header>
        <h1 className="font-semibold text-2xl md:text-3xl mb-8">
          Escolha o tipo de conta
        </h1>
        <Button variant="secondary" className="w-full py-12 gap-2">
          Entrar como empresa
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="secondary" className="w-full py-12 gap-2">
          Entrar como motorista
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
