import { Button } from "./ui/button";
import { ArrowRight, Building2, Truck } from "lucide-react";

export function SelectAccountType() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant="secondary"
        className="relative w-full py-8 gap-2 group border border-transparent hover:border-app-blue-500/5"
      >
        <span className="flex justify-center items-center absolute left-4 size-12 rounded-xl bg-white">
          <Building2 className="size-6 stroke-[1.4] text-app-blue-500" />
        </span>
        Entrar como empresa
        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
      <Button
        variant="secondary"
        className="relative w-full py-8 gap-2 group border border-transparent hover:border-black/5"
      >
        <span className="flex justify-center items-center absolute left-4 size-12 rounded-xl bg-white">
          <Truck className="size-6 stroke-[1.4] text-app-blue-500" />
        </span>
        Entrar como motorista
        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
}
