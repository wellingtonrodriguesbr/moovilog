import { Metadata } from "next";
import { RegisterCompanyAddress } from "@/components/platform/company/register-address";

export const metadata: Metadata = {
  title: "Cadastro empresa | Moovilog",
  description: "",
};

export default function RegisterCompanyAddressPage() {
  return (
    <main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
      <RegisterCompanyAddress />
    </main>
  );
}
