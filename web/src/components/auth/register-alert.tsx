"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "react-use";

export function RegisterAlert() {
  const [messageViewed, setMessageViewed] = useLocalStorage(
    "register:message-viewed",
    false
  );

  return (
    <AlertDialog open={!messageViewed}>
      <AlertDialogContent className="max-w-[350px] rounded-xl">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>
            WOOOOOW! Que massa te ver por aqui
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ficamos extremamente felizes com seu interesse em se registrar em
            nossa plataforma. Só um adendo, essa área é destinada para
            profissionais que irão gerenciar a logística da empresa, se você é
            motorista, você pede pedir ao gestor para lhe registrar na
            plataforma. Se você é um gestor, fique a vontade, estamos ansiosos
            em ter sua empresa conosco. 🎉
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setMessageViewed(true)}
            className="w-full"
          >
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
