import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { DriverLoginForm } from "./driver-login-form";

export function Driver() {
  return (
    <div className="w-full flex flex-col justify-center">
      <Link
        href="/entrar/selecionar-conta"
        className="w-fit flex items-center gap-2"
      >
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="font-semibold text-2xl md:text-3xl my-8">
        Acesse sua conta
      </h1>
      <DriverLoginForm />
    </div>
  );
}
