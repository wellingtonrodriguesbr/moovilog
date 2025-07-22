import { CardCompanyData } from "@/components/platform/pages/company/components/card-company-data";
import { CardCompanyAddress } from "@/components/platform/pages/company/components/card-company-address";
import { BackPageButton } from "@/components/platform/back-page-button";

export function CompanyInformation() {
  return (
    <section>
      <header className="space-y-4">
        <BackPageButton />
        <h1 className="text-2xl md:text-3xl font-medium">Dados cadastrais da empresa</h1>
        <p className="text-zinc-600">Gerencie as informações da empresa como: CNPJ, endereço, e etc.</p>
      </header>

      <div className="space-y-4 mt-12">
        <CardCompanyData />
        <CardCompanyAddress />
      </div>
    </section>
  );
}
