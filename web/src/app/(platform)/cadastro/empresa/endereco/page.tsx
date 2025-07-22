import { Metadata } from "next";
import { RegisterCompanyAddressForm } from "@/components/platform/pages/company/components/register-company-address-form";

export const metadata: Metadata = {
  title: "Cadastro de Empresa | Moovilog",
  description: "",
};

export default function RegisterCompanyAddressPage() {
  return (
    <main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
      <RegisterCompanyAddressForm />
    </main>
  );
}
