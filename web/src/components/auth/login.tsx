import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { CompanyLoginForm } from "./company-login-form";

export function Login() {
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
      <CompanyLoginForm />
      <Link href="/cadastro" className="text-center font-medium mt-8">
        Ainda não possui uma conta?{" "}
        <span className="underline">Registre-se</span>
      </Link>
    </div>
  );
}
