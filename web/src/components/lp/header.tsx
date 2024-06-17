import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, User } from "lucide-react";
import { MenuMobile } from "./menu-mobile";

export function Header() {
  return (
    <header className="w-full flex sticky-0 z-50 items-center justify-between px-4 md:px-8 pt-8 md:pt-12">
      <Image
        src="/logo.svg"
        alt="moovilog"
        className="w-[200px] md:w-[250px]"
        width={250}
        height={193}
      />
      <MenuMobile />
      <div className="hidden md:flex items-center gap-4">
        <Button variant="link" className="text-white font-bold gap-2">
          <User className="size-4" />
          Entrar
        </Button>
        <Button className="bg-white text-app-blue-900 font-bold gap-2">
          Criar minha conta
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </header>
  );
}
