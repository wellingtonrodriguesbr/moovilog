import { Metadata } from "next";
import { PerformanceManagement } from "@/components/platform/pages/performance-management";

export const metadata: Metadata = {
  title: "Gestão de Desempenho | Moovilog",
  description: "",
};

export default function PerformanceManagementPagePlatform() {
  return (
    <main>
      <PerformanceManagement />
    </main>
  );
}
