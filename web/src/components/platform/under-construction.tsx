import { AlertCircle } from "lucide-react";

export function UnderConstruction() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 mt-12">
      <AlertCircle className="size-10 text-amber-500 animate-pulse" />
      <h1 className="text-2xl">Página em construção</h1>
    </div>
  );
}
