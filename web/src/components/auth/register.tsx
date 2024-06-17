import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { RegisterForm } from "./register-form";
import { RegisterAlert } from "./register-alert";
import { Checkbox } from "../ui/checkbox";

export function Register() {
  return (
    <div className="w-full flex flex-col justify-center">
      <RegisterAlert />
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

      <div className="flex items-center gap-2 mt-5">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm font-medium opacity-80">
          Ao se cadastrar, você concorda com os termos e a política de
          privacidade da plataforma.
        </label>
      </div>

      <Link href="/entrar/selecionar-conta" className="text-center mt-8">
        Já possui uma conta?{" "}
        <span className="underline font-medium">Faça login</span>
      </Link>
    </div>
  );
}
