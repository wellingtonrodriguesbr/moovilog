import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CollaboratorsTable } from "./collaborators-table";

export function Collaborators() {
  return (
    <section>
      <header className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-medium">Colaboradores</h1>
        <Button className="w-full md:w-fit gap-2">
          <Plus className="size-4" />
          Adicionar novo
        </Button>
      </header>
      <div className="mt-12">
        <CollaboratorsTable />
      </div>
    </section>
  );
}
