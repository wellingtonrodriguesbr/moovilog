import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Menu } from "lucide-react";
import { useUserAuthenticate } from "@/hooks/use-user-authenticate";

export function MenuMobile() {
  const { isAuthenticate } = useUserAuthenticate();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu className="size-6 text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>
            <Image
              src="/logo-blue.svg"
              alt="moovilog"
              className="w-[180px]"
              width={250}
              height={193}
            />
          </SheetTitle>
        </SheetHeader>
        {isAuthenticate ? (
          <Link
            className="flex items-center justify-between w-full mt-12 py-4 border-b"
            href="/inicio"
          >
            Acessar plataforma
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <ul className="mt-12 flex flex-col">
            <li className="py-4 border-b">
              <Link href="/">Demonstração gratuita</Link>
            </li>
            <li className="py-4 border-b">
              <Link href="/">Saiba mais</Link>
            </li>
            <li className="py-4 border-b">
              <Link href="/cadastro">Criar minha conta</Link>
            </li>
            <li className="py-4 border-b">
              <Link href="/entrar/selecionar-conta">Entrar</Link>
            </li>
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
}
