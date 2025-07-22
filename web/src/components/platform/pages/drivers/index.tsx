import { DriversTable } from "@/components/platform/pages/drivers/components/drivers-table";
import { RegisterDriverDialog } from "@/components/platform/pages/drivers/components/register-driver-dialog";

export function Drivers() {
  return (
    <section>
      <header className="flex gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-medium">Motoristas</h1>
        <RegisterDriverDialog />
      </header>
      <div className="mt-12">
        <DriversTable />
      </div>
    </section>
  );
}
