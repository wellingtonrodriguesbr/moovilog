"use client";

import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useFetchRoutesFromCompany } from "@/hooks/route/use-fetch-routes-from-company";
import { RegisterRouteDialog } from "@/components/platform/pages/routes/components/register-route-dialog";
import { cn } from "@/lib/cn";
import { Check, ChevronsUpDown } from "lucide-react";

interface SelectRouteProps {
  selectedRoute: string;
  onChangeSelectedRoute: (route: string) => void;
}

export function SelectRoute({ selectedRoute, onChangeSelectedRoute }: SelectRouteProps) {
  const [open, setOpen] = useState(false);
  const { routes, isFetchRoutesFromCompanyPending } = useFetchRoutesFromCompany();

  function handleSelectRoute(currentValue: string) {
    const selectedRouteObj = routes.find((route) => route.id === currentValue);

    if (selectedRouteObj) {
      onChangeSelectedRoute(selectedRouteObj.id === selectedRoute ? "" : selectedRouteObj.id);
    }

    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isFetchRoutesFromCompanyPending}
          className="w-full bg-white justify-between font-normal"
        >
          {selectedRoute ? routes.find((route) => route.id === selectedRoute)?.name : "Selecione a rota"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Pesquise uma rota.." />
          <CommandList>
            <CommandEmpty className="flex flex-col gap-4 p-4 items-center">
              Nenhuma rota encontrada.
              <RegisterRouteDialog />
            </CommandEmpty>
            <CommandGroup>
              {routes.map((route) => (
                <CommandItem
                  key={route.id}
                  value={route.id}
                  onSelect={(currentValue) => handleSelectRoute(currentValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-app-blue-500",
                      selectedRoute === route.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {route.name}
                </CommandItem>
              ))}
              {routes.length > 0 && (
                <>
                  <CommandSeparator className="my-2 border-b" />
                  <RegisterRouteDialog buttonWidthFull />
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
