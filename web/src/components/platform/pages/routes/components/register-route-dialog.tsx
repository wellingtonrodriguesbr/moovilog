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
import { RegisterRouteForm } from "@/components/platform/pages/routes/components/register-route-form";

import { Plus } from "lucide-react";

interface RegisterRouteDialogProps {
  buttonWidthFull?: boolean;
}

export function RegisterRouteDialog({ buttonWidthFull }: RegisterRouteDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button data-widthFull={buttonWidthFull} className="data-[widthFull=true]:w-full">
          <Plus className="size-4" />
          Cadastrar rota
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo cadastro</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para cadastrar uma nova rota.</DialogDescription>
        </DialogHeader>
        <RegisterRouteForm onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
