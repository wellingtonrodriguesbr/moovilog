import { Metadata } from "next";
import { CompanyInformation } from "@/components/platform/pages/company/components/company-information";

export const metadata: Metadata = {
  title: "Dados cadastrais | Moovilog",
  description: "",
};

export default function CompanyInformationPlatform() {
  return (
    <main>
      <CompanyInformation />
    </main>
  );
}
