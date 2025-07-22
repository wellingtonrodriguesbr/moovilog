import { BackPageButton } from "@/components/platform/back-page-button";

export function PickupType() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-start gap-2">
        <BackPageButton />
        <h1 className="text-2xl md:text-3xl font-medium">Selecione uma opção</h1>
        <p className="text-sm text-zinc-600">
          Escolha uma das opções abaixo para continuar o cadastro de uma nova coleta.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 bg-zinc-100 rounded-md"></div>
        <div className="h-48 bg-zinc-100 rounded-md"></div>
      </div>
    </section>
  );
}
