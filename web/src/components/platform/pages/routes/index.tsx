import { RegisterRouteDialog } from "@/components/platform/pages/routes/components/register-route-dialog";
import { RoutesMetrics } from "@/components/platform/pages/routes/components/routes-metrics";
import { RoutesTable } from "@/components/platform/pages/routes/components/routes-table";

export function Routes() {
  return (
    <section>
      <header className="flex gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-medium">Rotas</h1>
        <RegisterRouteDialog />
      </header>
      <div className="flex flex-col gap-12 mt-12">
        {/* <RoutesMetrics /> */}
        <RoutesTable />
      </div>
    </section>
  );
}
