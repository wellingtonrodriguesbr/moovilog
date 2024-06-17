import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild className="block md:hidden">
        <Button variant="ghost">
          <Menu className="size-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>
            <Image
              src="/logo-blue.svg"
              alt="moovilog"
              className="w-[150px]"
              width={250}
              height={193}
            />
          </SheetTitle>
        </SheetHeader>
        <ul className="mt-12 flex flex-col">
          <li className="py-4 border-b">
            <Link href="/">Demonstração gratuita</Link>
          </li>
          <li className="py-4 border-b">
            <Link href="/">Saiba mais</Link>
          </li>
          <li className="py-4 border-b">
            <Link href="/">Criar minha conta</Link>
          </li>
          <li className="py-4 border-b">
            <Link href="/">Entrar</Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
