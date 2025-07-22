import { FreightDetailsForm } from "@/components/platform/pages/freights/freight-details/components/freight-details-form";
import { BackPageButton } from "@/components/platform/back-page-button";

export function FreightDetails() {
  return (
    <section>
      <header className="flex flex-col items-start gap-4">
        <BackPageButton />
        <h1 className="text-2xl md:text-3xl font-medium">Detalhes do frete</h1>
      </header>
      <div className="mt-12">
        <FreightDetailsForm />
      </div>
    </section>
  );
}
