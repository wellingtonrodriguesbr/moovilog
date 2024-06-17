import Image from "next/image";

import { Button } from "../ui/button";
import { ArrowRight, User } from "lucide-react";
import { MenuMobile } from "./menu-mobile";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full max-w-screen-2xl mx-auto flex sticky-0 z-50 items-center justify-between px-4 pt-8 md:pt-12">
      <Image
        src="/logo.svg"
        alt="moovilog"
        className="w-[200px] md:w-[250px]"
        width={250}
        height={193}
      />
      <MenuMobile />
      <div className="hidden md:flex items-center gap-4">
        <Button variant="link" className="text-white font-bold gap-2" asChild>
          <Link href="/entrar">
            <User className="size-4" />
            Entrar
          </Link>
        </Button>
        <Button className="bg-white hover:bg-app-cyan-100 text-app-blue-900 font-bold gap-2">
          Criar minha conta
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </header>
  );
}
