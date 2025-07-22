import { AreaChartComponent } from "@/components/platform/pages/performance-management/performance-management-metrics/area-chart";
import { PieChartComponent } from "@/components/platform/pages/performance-management/performance-management-metrics/pie-chart";
import { BarChartMixedComponent } from "@/components/platform/pages/performance-management/performance-management-metrics/bar-chart-mixed";

export function PerformanceManagement() {
  return (
    <section className="flex flex-col mt-4 gap-12 w-full h-[85vh]">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-medium">Gestão de desempenho</h1>
        <p>Acompanhe em tempo real os indicadores de desempenho da sua empresa</p>
      </header>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 pb-8">
        <AreaChartComponent />
        <BarChartMixedComponent />
      </div>
    </section>
  );
}
