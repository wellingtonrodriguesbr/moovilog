"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RegisterVehicleForm } from "@/components/platform/pages/vehicles/components/register-vehicle-form";

import { Plus } from "lucide-react";

interface RegisterVehicleDialogProps {
  buttonWidthFull?: boolean;
}

export function RegisterVehicleDialog({ buttonWidthFull }: RegisterVehicleDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button data-widthFull={buttonWidthFull} className="data-[widthFull=true]:w-full">
          <Plus className="size-4" />
          Cadastrar veículo
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[350px] overflow-auto max-h-[80vh] md:max-h-auto md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Novo cadastro de veículo</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo e lembre-se sempre de conferir os dados do veículo para evitar erros.
          </DialogDescription>
        </DialogHeader>
        <RegisterVehicleForm onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
