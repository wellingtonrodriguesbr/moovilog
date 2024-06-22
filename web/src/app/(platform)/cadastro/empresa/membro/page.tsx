import { RegisterCompanyMember } from "@/components/platform/company/register-company-member";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro empresa | Moovilog",
  description: "",
};

export default function RegisterCompanyMemberPage() {
  return (
    <main className="w-full max-w-screen-sm mx-auto p-4 md:p-12">
      <RegisterCompanyMember />
    </main>
  );
}
