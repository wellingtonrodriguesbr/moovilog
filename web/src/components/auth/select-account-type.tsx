import Link from "next/link";

import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Building2, Truck } from "lucide-react";

export function SelectAccountType() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Link href="/" className="w-fit flex items-center gap-2">
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="font-semibold text-2xl md:text-3xl mt-8 mb-4">
        Selecione o tipo de conta
      </h1>

      <Button
        variant="secondary"
        className="relative w-full py-8 gap-2 group border border-transparent hover:border-app-blue-500/5"
        asChild
      >
        <Link href="/entrar/empresa">
          <span className="flex justify-center items-center absolute left-4 size-12 rounded-md bg-white">
            <Building2 className="size-6 stroke-[1.4] text-app-blue-500" />
          </span>
          Entrar como empresa
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform absolute right-4" />
        </Link>
      </Button>
      <Button
        variant="secondary"
        className="relative w-full py-8 gap-2 group border border-transparent hover:border-black/5"
        asChild
      >
        <Link href="/entrar/motorista">
          <span className="flex justify-center items-center absolute left-4 size-12 rounded-md bg-white">
            <Truck className="size-6 stroke-[1.4] text-app-blue-500" />
          </span>
          Entrar como motorista
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform absolute right-4" />
        </Link>
      </Button>
    </div>
  );
}
