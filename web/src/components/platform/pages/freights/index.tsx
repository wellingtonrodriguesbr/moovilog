import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FreightsTable } from "@/components/platform/pages/freights/components/freights-table";
import { FreightsMetrics } from "@/components/platform/pages/freights/components/freights-metrics";
import { Plus } from "lucide-react";

export function Freights() {
  return (
    <section>
      <header className="flex gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-medium">Fretes</h1>
        <Button asChild>
          <Link href="/fretes/novo">
            <Plus className="size-4" />
            Cadastrar frete
          </Link>
        </Button>
      </header>
      <div className="flex flex-col gap-12 mt-12">
        <FreightsMetrics />
        <FreightsTable />
      </div>
    </section>
  );
}
