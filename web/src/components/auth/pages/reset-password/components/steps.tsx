"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "./reset-password-form";
import { EnterYourEmailForm } from "./enter-your-email-form";

export function Steps() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("id");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl md:text-3xl my-6">
        {userId ? "Crie uma nova senha" : "Informe seu e-mail"}
      </h1>
      {userId ? <ResetPasswordForm /> : <EnterYourEmailForm />}
    </div>
  );
}
