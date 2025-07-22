import { Metadata } from "next";
import { Financial } from "@/components/platform/pages/financial";

export const metadata: Metadata = {
  title: "Financeiro | Moovilog",
  description: "",
};

export default function FinancialPagePlatform() {
  return (
    <main>
      <Financial />
    </main>
  );
}
