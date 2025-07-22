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
import { RegisterDriverForm } from "@/components/platform/pages/drivers/components/register-driver-form";

import { Plus } from "lucide-react";

interface RegisterDriverDialogProps {
  buttonWidthFull?: boolean;
}

export function RegisterDriverDialog({ buttonWidthFull }: RegisterDriverDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button data-widthFull={buttonWidthFull} className="data-[widthFull=true]:w-full">
          <Plus className="size-4" />
          Cadastrar motorista
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo cadastro</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo e lembre-se sempre de conferir os documentos do motorista para evitar erros.
          </DialogDescription>
        </DialogHeader>
        <RegisterDriverForm onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
