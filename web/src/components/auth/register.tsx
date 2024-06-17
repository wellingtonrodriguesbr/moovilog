import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { RegisterForm } from "./register-form";

export function Register() {
  return (
    <div className="w-full flex flex-col justify-center">
      <Link
        href="/entrar/selecionar-conta"
        className="w-fit flex items-center gap-2"
      >
        <ArrowLeft className="size-4" /> Voltar
      </Link>
      <h1 className="font-semibold text-2xl md:text-3xl my-8">
        Crie uma conta gratuitamente
      </h1>
      <RegisterForm />

      <Link href="/entrar/selecionar-conta" className="text-center mt-8">
        Já possui uma conta?{" "}
        <span className="underline font-medium">Faça login</span>
      </Link>
    </div>
  );
}
