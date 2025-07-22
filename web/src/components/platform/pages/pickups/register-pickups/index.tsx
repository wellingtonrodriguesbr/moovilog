import { BackPageButton } from "@/components/platform/back-page-button";
import { RegisterPickupForm } from "./components/register-pickup-form";

export function RegisterPickups() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-start gap-2">
        <BackPageButton />
        <h1 className="text-2xl md:text-3xl font-medium">Nova coleta</h1>
        <p className="text-sm text-zinc-600">Preencha as informações abaixo para cadastrar uma nova coleta.</p>
      </header>
      <div>
        <RegisterPickupForm />
      </div>
    </section>
  );
}
