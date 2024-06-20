import { RegisterCompanyAddressForm } from "./register-address-form";

export function RegisterCompanyAddress() {
  return (
    <section>
      <header className="w-full flex items-center justify-between">
        <h1 className="font-medium text-2xl">Cadastro de empresa</h1>
        <span className="text-sm">Etapa 02 de 03</span>
      </header>

      <div className="mt-16">
        <RegisterCompanyAddressForm />
      </div>
    </section>
  );
}
