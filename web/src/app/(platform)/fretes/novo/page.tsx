import { RegisterFreight } from "@/components/platform/pages/freights/register-freight";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo frete | Moovilog",
  description: "",
};

export default function RegisterNewFreightPagePlatform() {
  return (
    <main className="w-full xl:max-w-screen-lg mx-auto p-0 md:p-6">
      <RegisterFreight />
    </main>
  );
}
