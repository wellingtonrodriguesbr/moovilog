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

import { Loader } from "lucide-react";
import { UpdateVehicleStatusForm } from "./update-vehicle-status-form";
import { Vehicle } from "@/interfaces";

interface UpdateVehicleStatusDialogProps {
  vehicleId: string;
  currentStatus: Vehicle["status"];
}

export function UpdateVehicleStatusDialog({ vehicleId, currentStatus }: UpdateVehicleStatusDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex items-center gap-2 px-2 py-1 hover:bg-zinc-100 rounded-sm text-sm">
        <Loader className="size-4" />
        Atualizar status
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[350px] overflow-auto max-h-[80vh] md:max-h-auto md:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Atualizar status do veículo</DialogTitle>
          <DialogDescription>Selecione o novo status para este veículo</DialogDescription>
        </DialogHeader>
        <UpdateVehicleStatusForm
          onCloseDialog={handleCloseDialog}
          currentStatus={currentStatus}
          vehicleId={vehicleId}
        />
      </DialogContent>
    </Dialog>
  );
}
