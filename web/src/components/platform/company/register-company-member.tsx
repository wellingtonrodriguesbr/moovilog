import { RegisterCompanyMemberForm } from "./register-company-member-form";

export function RegisterCompanyMember() {
  return (
    <section>
      <header className="w-full flex items-center justify-between">
        <h1 className="font-medium text-2xl">Cadastro de membro</h1>
        <span className="text-sm">Etapa 03 de 03</span>
      </header>

      <div className="mt-16">
        <RegisterCompanyMemberForm />
      </div>
    </section>
  );
}
