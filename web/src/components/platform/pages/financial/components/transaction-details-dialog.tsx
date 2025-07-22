"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Info } from "lucide-react";

export function TransactionDetailsDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 rounded-sm">
          <Info className="size-4" />
          Ver detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[350px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes da transação</DialogTitle>
        </DialogHeader>
        {/* <RegisterDriverForm onCloseDialog={handleCloseDialog} /> */}
      </DialogContent>
    </Dialog>
  );
}
