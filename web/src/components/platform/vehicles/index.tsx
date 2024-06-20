import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VehiclesTable } from "./vehicles-table";

export function Vehicles() {
  return (
    <section>
      <header className="flex gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-medium">Veículos</h1>
        <Button className="gap-2">
          <Plus className="size-4" />
          <span className="hidden md:block">Adicionar novo</span>
        </Button>
      </header>
      <div className="mt-12">
        <VehiclesTable />
      </div>
    </section>
  );
}
